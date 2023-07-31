import { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { tickerList, startDate, endDate } = req.query;

  const tickerListArray = tickerList as string[];

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.SIM_FIN_API_KEY!,
    },
  };
  const apiData = await Promise.all(
    tickerListArray.map(async (ticker) => {
      const response = await fetch(
        `https://backend.simfin.com/api/v3/companies/prices/compact?ticker=GOOG%2CTSLA&start=2023-07-21&end=2023-07-21`,
        options
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch data for ${ticker}`);
      }

      const data = await response.json();
      return data;
    })
  );

  res.status(200).json(apiData);
}
