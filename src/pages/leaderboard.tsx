import React from "react";
import styled from "styled-components";
import { getCompetitors } from "../api/get-competitors";
import { CompetitorList } from "../components/competitors/competitor-list";
import { ApiStatus, useApi } from "../hooks/use-api";
import { MIN_CONTENT_HEIGHT, SpacingSizes } from "../theme/constants";

const StyledPageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin: ${SpacingSizes.Large}px;
  min-height: ${MIN_CONTENT_HEIGHT}px;
`;

export function LeaderboardPage(): JSX.Element | null {
  const { response, status } = useApi(getCompetitors);

  if (status !== ApiStatus.Success) return null;

  return (
    <StyledPageContainer>
      <CompetitorList competitors={response?.data} />
    </StyledPageContainer>
  );
}
