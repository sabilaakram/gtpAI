import { promises as fs } from "fs";

import { generateItenary } from "./action";
import GtpMaps from "./components/GtpMaps";
import ExpandableSection from "./components/Expandable";
import ExcelCreate from "./components/ExcelCreate";
import DestForm from "./components/DestForm";
import { ProgressBar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import MyProgress from "./components/MyProgress";
import MyProgressBar from "./components/MyProgress";
import NavBar from "./components/NavBar";
import WeatherWidget from "./components/WeatherWidget";
import GuessTheNumber from "./components/GuessTheNumber";

export default async function Home() {
  const destination_file = await fs.readFile(
    "app/data/destinations.csv",
    "utf8"
  );
  const mydestinations = destination_file
    .split("\n")
    .map((row: string): string[] => {
      return row.split(",");
    });

  const package_file = await fs.readFile("app/data/packages.csv", "utf8");
  const mypackages = package_file.split("\n").map((row: string): string[] => {
    return row.split(",");
  });

  const route_file = await fs.readFile("app/data/routes.csv", "utf8");
  const myroutes = route_file.split("\n").map((row: string): string[] => {
    return row.split(",");
  });

  return (
    <>
      <main
        style={{
          backgroundColor: "#ebf0f4", // Light background color
          // padding: "1rem", // Optional: Add padding if needed
          // paddingTop: "calc(1rem + 80px)",
          // minHeight: "100vh", // Ensures the main element takes at least the full viewport height
          margin: 0, // Removes default margin
          display: "flex", // Use flexbox for alignment if needed
          flexDirection: "column", // Stack child elements vertically
        }}
        className="px-6 md:px-32 pt-24"
      >
        <DestForm
          destinationData={mydestinations}
          packageData={mypackages}
          routeData={myroutes}
        ></DestForm>
        <br></br>
      </main>
    </>
  );
}
