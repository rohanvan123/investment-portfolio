import { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { ticker, startDate, endDate } = req.query;
  console.log("called api");

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.SIM_FIN_API_KEY!,
    },
  };
  const response = await fetch(
    `https://backend.simfin.com/api/v3/companies/prices/compact?ticker=${ticker}&start=${startDate}&end=${endDate}`,
    options
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch data for ${ticker}`);
  }

  const data = await response.json();

  res.status(200).json(data);
}
