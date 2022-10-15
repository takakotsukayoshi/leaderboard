import React, {useCallback, useEffect, useRef, useState} from "react";
import styled, {css} from "styled-components";
import {RankedCompetitorData} from "../../hooks/use-update-ranking";
import {hueShift} from "../../theme/animations";
import {
  GapSizes,
  LIST_COMPONENT_HEIGHT,
  LIST_COMPONENT_OFFSET,
  MAX_COMPETITOR_PICTURE_WIDTH,
  MAX_CONTENT_WIDTH,
  MIN_CONTENT_WIDTH,
  RadiusSizes
} from "../../theme/constants";

const image = require("../../assets/flame.gif"); /* tslint:disable no-var-requires */

enum CompetitorSectionNames {
  Ranking = "ranking",
  Info = "competitor-info",
  Points = "competitor-points"
}

const StyledSection = styled.section<{ name?: string }>`
  display: flex;
  gap: ${GapSizes.ExtraLarge}px;
  align-items: center;
  font-variant-numeric: tabular-nums;

  em {
    font-variant-numeric: tabular-nums;
  }

  &[name=${CompetitorSectionNames.Ranking}] {
    em {
      min-width: ${LIST_COMPONENT_OFFSET}px;
    }
  }

  &[name=${CompetitorSectionNames.Info}] {
    align-items: center;
    flex-grow: 1;

    h4 {
      font-weight: 400;
    }
  }
`;

const OnFireCompetitor = css`
  animation: ${hueShift} 1.5s ease-in-out infinite alternate;
`;

const StyledCompetitor = styled.div<{ rank: number; onStreak: boolean }>`
  background-color: ${(props) => props.theme.palette.primary};
  border-radius: ${RadiusSizes.Large}px;
  color: white;
  display: flex;
  margin: 15px;
  padding: 0 15px;
  max-width: ${MAX_CONTENT_WIDTH}px;
  min-width: ${MIN_CONTENT_WIDTH}px;
  width: 100%;
  height: ${LIST_COMPONENT_HEIGHT}px;
  position: absolute;
  transition: all 0.5s ease;
  top: ${(props) =>
    props.rank * (LIST_COMPONENT_HEIGHT + GapSizes.ExtraLarge)}px;
  align-items: center;
  box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%),
    0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);

  img {
    max-width: ${MAX_COMPETITOR_PICTURE_WIDTH}px;
    aspect-ratio: 1;
    object-fit: cover;
    border-radius: 50%;
  }

  ${(props) => props.onStreak && OnFireCompetitor}

  ${(props) =>
    props.rank === 0 &&
    `background-color: ${props.theme.palette.primaryHighlight};`};

  ${(props) =>
    props.rank === 9 &&
    `background-color: ${props.theme.palette.primaryDarkened};`};
`;

const StyledImage = styled.img<{ onStreak: boolean }>`
  opacity: 0;
  transition: 0.3s ease;

  ${(props) => props.onStreak && "opacity: 1;"};
`;

interface CompetitorProps {
  competitor: RankedCompetitorData;
}

export function Competitor({ competitor }: CompetitorProps) {
  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number>();
  const [score, setScore] = useState(competitor.score);
  const [streak, setStreak] = useState(0);
  const [prevPosition, setPrevPosition] = useState(competitor.rankPosition);

  const interpolateScore = useCallback(
    (time: number) => {
      const { current } = previousTimeRef;
      let delta: number;
      // @ts-ignore: Unreachable code error
      delta = time - current; /* tslint:disable prefer-const */
      if (current !== undefined) {
        // Increment score based on delta time
        if (score < competitor.score) {
          setScore((score) => score + Math.floor(0.5 * delta));
        }

        // Shouldnt happen unless some lag occurs, but never hurts to be defensive
        if (score > competitor.score) {
          setScore(competitor.score);
        }

        // If the user is climbing the ranking ladder or is still top 1, increase streak
        if (
          competitor.rankPosition < prevPosition ||
          competitor.rankPosition === 1
        ) {
          if (score > 0) {
            setStreak((streak) => streak + 1);
          }
        }

        // If the user falls down the ladder, lose the streak
        if (competitor.rankPosition > prevPosition) {
          setStreak(0);
        }

        // Updates the ladder position
        if (competitor.rankPosition !== prevPosition) {
          setPrevPosition(competitor.rankPosition);
        }
      }

      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(interpolateScore);
    },
    [competitor.rankPosition, competitor.score, prevPosition, score]
  );

  useEffect(() => {
    requestRef.current = requestAnimationFrame(interpolateScore);
    return () => cancelAnimationFrame(requestRef.current as number);
  }, [interpolateScore]);

  return (
    <StyledCompetitor
      key={competitor.userID}
      rank={competitor.rankPosition - 1}
      onStreak={streak >= 2}
    >
      <StyledSection name={CompetitorSectionNames.Ranking}>
        <div>
          <StyledImage
            src={(image as unknown) as string}
            alt="On A Streak flame gif"
            onStreak={streak >= 1}
          />
        </div>
        <em>{competitor.rankPosition}</em>
      </StyledSection>

      <StyledSection name={CompetitorSectionNames.Info}>
        <img src={competitor.picture} alt={`${competitor.displayName}`} />
        <h4>{competitor.displayName}</h4>
      </StyledSection>

      <StyledSection name={CompetitorSectionNames.Points}>
        <em>{Math.floor(score)} pts</em>
      </StyledSection>
    </StyledCompetitor>
  );
}
