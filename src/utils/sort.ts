import { LeaderboardData } from "../hooks/use-update-ranking";

export function sortLeaderboard(leaderboard: LeaderboardData) {
  const sorted = Object.values(leaderboard).sort(
    (a, b) => b.score - a.score || a.userID.localeCompare(b.userID)
  );

  for (const [index, competitor] of Object.entries(sorted)) {
    competitor.rankPosition = parseInt(index) + 1;
  }

  return sorted;
}
