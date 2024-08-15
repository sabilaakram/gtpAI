"use client";

import React from "react";
import { useEffect } from "react";
import * as XLSX from "xlsx";

const itineraryStr = `
| Day          | Time            | Activity                       | Description                                                                                  |
|--------------|-----------------|--------------------------------|----------------------------------------------------------------------------------------------|
| July 30     | 9:00-10:00 am   | Arrival                        | Arrive in Skardu and check into Shangrila Resort                                            |
| July 30     | 10:00-11:00 am  | Check-in                       | Check into hotel (Shangrila Resort)                                                         |
| July 30     | 11:00-12:30 pm  | Visit Lower Kachura Lake      | Explore the scenic Shangrila Resort at Lower Kachura Lake                                   |
| July 30     | 12:30-1:30 pm   | Lunch                         | Enjoy lunch at the resort's restaurant                                                      |
| July 30     | 1:30-3:30 pm    | Explore Upper Kachura Lake    | Visit and relax at Upper Kachura Lake                                                        |
| July 30     | 3:30-5:00 pm    | Leisure Time                  | Spend leisure time at the lake                                                                |
| July 30     | 5:00-7:00 pm    | Skardu Bazaar                 | Explore local culture and shop at Skardu Bazaar                                             |
| July 30     | 7:00-8:00 pm    | Dinner                        | Dinner at a local restaurant                                                                  |
|--------------|-----------------|--------------------------------|----------------------------------------------------------------------------------------------|
| July 31     | 8:00-9:00 am    | Breakfast                     | Enjoy breakfast at hotel                                                                      |
| July 31     | 9:00-10:30 am   | Drive to Deosai National Park | Jeep ride to Deosai National Park                                                             |
| July 31     | 10:30-12:30 pm  | Explore Deosai National Park  | Discover the beautiful landscapes of Deosai                                                   |
| July 31     | 12:30-1:30 pm   | Picnic Lunch                  | Picnic lunch at Sheosar Lake (ticket price includes boating)                                 |
| July 31     | 1:30-3:00 pm    | Boating at Sheosar Lake      | Enjoy boating at Sheosar Lake                                                                 |
| July 31     | 3:00-5:00 pm    | Continue Exploring            | Continue exploring Deosai National Park                                                        |
| July 31     | 5:00-6:30 pm    | Return to Skardu             | Return to Skardu from Deosai                                                                   |
| July 31     | 6:30-8:00 pm    | Dinner                        | Dinner at a local restaurant                                                                   |
|--------------|-----------------|--------------------------------|----------------------------------------------------------------------------------------------|
| August 1    | 8:00-9:00 am    | Breakfast                     | Enjoy breakfast at hotel                                                                      |
| August 1    | 9:00-10:30 am   | Visit Shigar Fort             | Explore the historical Shigar Fort                                                             |
| August 1    | 10:30-12:00 pm  | Explore Kharpocho Fort       | Visit and explore Kharpocho Fort                                                              |
| August 1    | 12:00-1:00 pm   | Lunch                         | Lunch at a local restaurant                                                                    |
| August 1    | 1:00-3:00 pm    | Katpana Desert                | Visit and explore the Cold Desert of Katpana                                                  |
| August 1    | 3:00-5:00 pm    | Visit Manthokha Waterfall     | Explore the beautiful Manthokha Waterfall                                                     |
| August 1    | 5:00-6:30 pm    | Visit Chaqchan Mosque         | Visit the historic Chaqchan Mosque                                                             |
| August 1    | 6:30-8:00 pm    | Dinner                        | Enjoy dinner and reflect on the trip at a local restaurant                                    |
`;
const ExcelCreate = ({ itineraryString }: { itineraryString: string }) => {
  const parseItinerary = () => {
    // Split the string into rows
    const rows = itineraryString.trim().split("\n");

    // Extract headers and data
    const headers = rows[0]
      .split("|")
      .map((header) => header.trim())
      .filter((header) => header);
    const data = rows
      .slice(2)
      .map((row) => {
        const columns = row
          .split("|")
          .map((column) => column.trim())
          .filter((column) => column);

        if (columns.length === headers.length) {
          // Define a type for the object with dynamic keys
          const rowObject = headers.reduce<{ [key: string]: string }>(
            (acc, header, index) => {
              acc[header] = columns[index];
              return acc;
            },
            {}
          );

          return rowObject;
        }

        return null;
      })
      .filter((row) => row);

    return data;
  };

  const generateExcel = () => {
    const data = parseItinerary();

    // Convert the data to a worksheet
    const worksheet = XLSX.utils.json_to_sheet(data);

    // Create a new workbook and add the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Itinerary");

    // Create a blob and trigger the download
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    const url = URL.createObjectURL(blob);

    // Create a link element and trigger the download
    const a = document.createElement("a");
    a.href = url;
    a.download = "itinerary.xlsx";
    document.body.appendChild(a);
    a.click();

    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <button
        style={{
          backgroundColor: "#4CAF50", // Green background
          border: "none", // Remove borders
          color: "white", // White text
          padding: "10px 20px", // Some padding
          fontSize: "16px", // Font size
          cursor: "pointer", // Pointer/hand icon on hover
          borderRadius: "5px", // Rounded corners
          transition: "background-color 0.4s", // Smooth transition for hover effect
        }}
        onClick={generateExcel}
      >
        Download Excel
      </button>
    </div>
  );
};
export default ExcelCreate;
