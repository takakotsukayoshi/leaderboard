import React from "react";
import { ThemeProvider } from "styled-components";
import { LeaderboardPage } from "../pages/leaderboard";
import { GlobalStyle } from "../theme/global-style";
import { theme } from "../theme/theme";

export function App(): JSX.Element {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <LeaderboardPage />
      </ThemeProvider>
    </>
  );
}
