import { LeaderboardData } from "../hooks/use-update-ranking";

export function getRandomProperty(obj: Record<string, unknown>) {
    const keys = Object.keys(obj);
    
    return keys[Math.floor(Math.random() * keys.length)];
}

export function getRandomInRange(min: number, max: number): number {
    return (Math.random() * (max - min + 1)) << 0;
}

export function sortLeaderboard(leaderboard: LeaderboardData) {
    const sorted = Object.values(leaderboard).sort(
        (a, b) => b.score - a.score || a.userID.localeCompare(b.userID)
    );

    for (const [index, competitor] of Object.entries(sorted)) {
        competitor.rankPosition = parseInt(index) + 1;
    }

    return sorted;
}
