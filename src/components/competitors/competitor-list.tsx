import React from "react";
import { CompetitorData } from "../../api/get-competitors";
import { useLeaderboard } from "../../hooks/use-update-ranking";
import { Competitor } from "./competitor";

interface CompetitorListProps {
  competitors: CompetitorData[];
}

export function CompetitorList({
  competitors
}: CompetitorListProps): JSX.Element {
  const leaderboard = useLeaderboard(competitors);

  return (
    <>
      {Object.values(leaderboard)?.map((competitor) => (
        <Competitor competitor={competitor} key={competitor.userID} />
      ))}
    </>
  );
}
