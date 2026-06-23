
export async function GET() {
    try {
        const res = await fetch(
            "https://api.sportmonks.com/v3/football/fixtures?api_token=Y2Q7F8inqQTIfwanRX6JiDkILh3ny8FFPDraTvi4gZpUw8pU4GtxLms11mep"
        );

        if (!res.ok) {
            return Response.json(
                { error: "Failed to fetch matches" },
                { status: 500 }
            );
        }

        const data = await res.json();

        const matches = (data?.data || []).map((item: any) => ({
            id: item.id,
            date: item.starting_at?.split("T")[0] || "Unknown",
            time: item.starting_at?.split("T")[1]?.slice(0, 5) || "00:00",
            tournament: item.league?.name || "Unknown Tournament",

            teamA: {
                name: item.participants?.[0]?.name || "Team A",
                flag: "⚽",
            },

            teamB: {
                name: item.participants?.[1]?.name || "Team B",
                flag: "⚽",
            },

            status: item.state || "UPCOMING",

            score: {
                teamA: item.scores?.[0]?.score ?? 0,
                teamB: item.scores?.[1]?.score ?? 0,
            },

            channel: "Live",
        }));

        return Response.json(matches);
    } catch (error) {
        return Response.json(
            { error: "Server error" },
            { status: 500 }
        );
    }
}