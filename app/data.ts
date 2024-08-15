import { promises as fs } from "fs";

export const destinations_data = async () =>
  (await fs.readFile("app/data/destinations.csv", "utf8"))
    .split("\n")
    .map((row: string): string[] => {
      return row.split(",");
    });
