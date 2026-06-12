import { Channel } from "@/types/channel";

function extractQuality(name: string): string {
    if (name.includes("1080p")) return "1080p";
    if (name.includes("720p")) return "720p";
    if (name.includes("480p")) return "480p";
    return "HD";
}

// Extract language from tvg-id
function extractLanguage(tvgId: string): string {
    const match = tvgId.match(/@([^@]+)$/);

    if (!match) return "English";

    const lang = match[1];

    const languageMap: Record<string, string> = {
        English: "English",
        French: "French",
        German: "German",
        Spanish: "Spanish",
        HispanicAmerica: "Spanish (LA)",
        Italy: "Italian",
        Portuguese: "Portuguese",
        Spain: "Spanish (ES)",
        UnitedStates: "English (US)",
        SD: "SD",
    };

    return languageMap[lang] ?? lang;
}

// Parse M3U playlist into Channel objects
export function parseM3U(content: string): Channel[] {
    const lines = content
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);

    const channelMap = new Map<string, Channel>();

    let i = 0;

    while (i < lines.length) {
        const line = lines[i];

        if (line.startsWith("#EXTINF:")) {
            const tvgId =
                line.match(/tvg-id="([^"]*)"/)?.[1] ?? "";

            const logo =
                line.match(/tvg-logo="([^"]*)"/)?.[1] ?? "";

            const group =
                line.match(/group-title="([^"]*)"/)?.[1] ?? "Other";

            const fullName =
                line.match(/,(.+)$/)?.[1]?.trim() ?? "Unknown";

            // Remove quality suffixes from channel name
            const baseName = fullName
                .replace(/\s*\(\d+p\)\s*/g, "")
                .trim();

            const url = lines[i + 1];

            if (url && !url.startsWith("#")) {
                const key = `${baseName}__${tvgId}`;

                if (channelMap.has(key)) {
                    channelMap.get(key)!.urls.push(url);
                } else {
                    channelMap.set(key, {
                        id: key.replace(/[^a-zA-Z0-9]/g, "_"),
                        name: baseName,
                        logo,
                        group,
                        tvgId,
                        urls: [url],
                        activeUrlIndex: 0,
                        quality: extractQuality(fullName),
                        language: extractLanguage(tvgId),
                    });
                }

                i += 2;
                continue;
            }
        }

        i++;
    }

    return Array.from(channelMap.values());
}

// Group channels by category
export function groupChannels(
    channels: Channel[]
): Record<string, Channel[]> {
    return channels.reduce<Record<string, Channel[]>>((acc, channel) => {
        if (!acc[channel.group]) {
            acc[channel.group] = [];
        }

        acc[channel.group].push(channel);

        return acc;
    }, {});
}