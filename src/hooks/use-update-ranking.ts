import { useCallback, useEffect, useRef, useState } from "react";
import { CompetitorData } from "../api/get-competitors";
import {
  MAX_POSSIBLE_POINTS,
  MIN_POSSIBLE_POINTS,
  TICK_RATE_IN_MS
} from "../theme/constants";
import { getRandomInRange, getRandomProperty, sortLeaderboard } from "../utils/helper";

export type CompetitorDataWithScore = CompetitorData & {
  score: number;
};

export type RankedCompetitorData = CompetitorDataWithScore & {
  rankPosition: number;
};

export type LeaderboardData = Record<string, RankedCompetitorData>;

function formatData(
  competitors: CompetitorData[],
  config?: Record<string, string | number>
): LeaderboardData {
  const leaderboard: LeaderboardData = competitors.reduce((acc, competitor) => {
    return {
      ...acc,
      [competitor.userID]: {
        ...competitor,
        ...config
      }
    };
  }, {});

  sortLeaderboard(leaderboard);

  return leaderboard;
}

export function useLeaderboard(competitors: CompetitorData[]): LeaderboardData {
  const [leaderboard, setLeaderboard] = useState<LeaderboardData>(
    formatData(competitors, {
      score: 0,
      rankPosition: 0
    })
  );

  const newScoreInterval = useRef<number>();

  const handleTimer = useCallback(() => {
    // @ts-ignore: Unreachable code error
    newScoreInterval.current = setInterval(() => {
      const updatedLeaderboard = { ...leaderboard };
      const randomId = getRandomProperty(leaderboard);

      updatedLeaderboard[randomId].score += getRandomInRange(
        MIN_POSSIBLE_POINTS,
        MAX_POSSIBLE_POINTS
      );

      sortLeaderboard(updatedLeaderboard);
      setLeaderboard(updatedLeaderboard);
    }, TICK_RATE_IN_MS);
  }, [leaderboard]);

  useEffect(() => {
    handleTimer();

    return () => clearInterval(newScoreInterval.current);
  }, [handleTimer, leaderboard]);

  return leaderboard;
}
