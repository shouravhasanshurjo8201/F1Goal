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


export function parseM3U(content: string): Channel[] {
    const lines = content
        .split("\n")
        .map(l => l.trim())
        .filter(l => l && !l.startsWith("#EXTM3U"));

    const channels: Channel[] = [];
    let current: any = null;

    for (const line of lines) {
        if (line.startsWith("#EXTINF")) {
            const tvgId = line.match(/tvg-id="([^"]*)"/)?.[1] ?? "";
            const logo = line.match(/tvg-logo="([^"]*)"/)?.[1] ?? "";
            const group = line.match(/group-title="([^"]*)"/)?.[1] ?? "Other";
            const name = line.split(",")[1]?.trim() ?? "Unknown";

            current = {
                id: tvgId + Math.random(),
                name,
                logo,
                group,
                tvgId,
                urls: [],
                activeUrlIndex: 0,
                quality: "HD",
                language: "English",
            };
        }
        else if (current && !line.startsWith("#")) {
            current.urls.push(line);
            channels.push(current);
            current = null;
        }
    }

    return channels;
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