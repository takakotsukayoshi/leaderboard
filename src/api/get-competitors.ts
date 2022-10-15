import { CompetitorDataWithScore } from "../hooks/use-update-ranking";
import staticData from "../static/response.json";

export interface CompetitorData {
  userID: string;
  displayName: string;
  picture: string;
}

export interface CompetitorEndpointResponse {
  data: CompetitorData[];
}

export function parseCompetitors(
  data: CompetitorDataWithScore[]
): CompetitorEndpointResponse {
  return {
    data: data.map(({ score, ...rest }) => ({
      ...rest
    }))
  };
}

const request: RequestInit = {
  method: "GET",
  headers: {
    "Content-Type": "application/json"
  }
};

export async function getCompetitors(): Promise<CompetitorEndpointResponse> {
  const url = "https://webcdn.17app.co/campaign/pretest/data.json";
  let data: CompetitorDataWithScore[];

  try {
    const response = await fetch(url, request);
    data = (await response.json()) as CompetitorDataWithScore[];
  } catch (err) {
    data = staticData as CompetitorDataWithScore[];
  }

  const parsedData = parseCompetitors(data);

  return parsedData;
}
