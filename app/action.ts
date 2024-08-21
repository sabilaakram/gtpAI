"use server";

import { promises as fs } from "fs";
import nodemailer from "nodemailer";

interface Response_Object {
  text: string;
  weather_text: string;
  text_strings: string[];
  lats: string[];
  longs: string[];
  names: string[];
  Imageurls: string[];
  routeText: string;
  sales_text: string;
  itinerary_id: number;
}

export async function generateItenary(formdata: FormData) {
  const dest_id = formdata.get("Destinations");
  const start = formdata.get("trip-start");
  const end = formdata.get("trip-end");
  const pickup = formdata.get("Pickup");
  const children = formdata.get("children");
  const adults = formdata.get("adults");
  const package_id = formdata.get("Packages");
  const route_id = formdata.get("Route");
  const transport_means = formdata.get("transport");
  console.log(formdata);

  let itinerary_num =
    parseInt(await fs.readFile("app/data/itineraryID.txt", "utf8")) + 1;

  await fs.writeFile(
    "app/data/itineraryID.txt",
    itinerary_num.toString(),
    "utf8"
  );

  let days = 1;
  if (
    start !== null &&
    typeof start === "string" &&
    end !== null &&
    typeof end === "string"
  ) {
    // Now TypeScript knows that start is a string
    days = calculateDaysBetween(start, end);
  } else {
    // Handle the case where start is null or not a string
    console.error(start, end);
  }

  const destination_file = await fs.readFile(
    "app/data/destinations.csv",
    "utf8"
  );
  const mydestinations = destination_file
    .split("\n")
    .map((row: string): string[] => {
      return row.split(",");
    });

  let dest_name, dest_lat, dest_long;
  for (const row of mydestinations) {
    if (row[0] === dest_id) {
      dest_name = row[1]; // Return the name if the id matches
      dest_lat = row[3];
      dest_long = row[4];
      break;
    }
  }

  const package_file = await fs.readFile("app/data/packages.csv", "utf8");

  const mypackages = package_file.split("\n").map((row: string): string[] => {
    return row.split(",");
  });
  let pack_name;
  for (const row of mypackages) {
    if (row[0] === package_id) {
      pack_name = row[1]; // Return the name if the id matches
      break;
    }
  }

  const atrraction_file = await fs.readFile("app/data/attraction.csv", "utf8");

  const myattractions = atrraction_file
    .split("\n")
    .map((row: string): string[] => {
      return row.split(",");
    });

  let att_names: string[] = [];
  let att_lats: string[] = [],
    att_longs: string[] = [],
    att_images: string[] = [];

  for (const row of myattractions) {
    if (row[2] === dest_id) {
      att_names.push(row[0]); // Return the name if the id matches
      att_lats.push(row[5]);
      att_longs.push(row[6].slice(0, -1));
      att_images.push(row[7]);
    }
  }

  const route_file = await fs.readFile("app/data/routes.csv", "utf8");

  const myroutes = route_file.split("\n").map((row: string): string[] => {
    return row.split(",");
  });

  let route_name, route_attractions, route_time, route_hotel, route_food;
  if (route_id !== "") {
    for (const row of myroutes) {
      if (row[0] === route_id) {
        route_name = row[4]; // Return the name if the id matches
        route_attractions = row[5];
        route_time = row[6];
        route_hotel = row[7];
        route_food = row[8];
        break;
      }
    }
  }

  /**********Weather Data********************/

  const weather_url = `https://api.open-meteo.com/v1/forecast?latitude=${dest_lat}&longitude=${dest_long}&start_date=${start}&end_date=${end}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,snowfall_sum,weathercode&timezone=Asia/Karachi`;

  let res = "";

  let dates, minTemps, maxTemps, weatherCodes;
  await fetch(weather_url)
    .then((response) => response.json())
    .then((data) => {
      dates = data.daily.time;
      minTemps = data.daily.temperature_2m_min;
      maxTemps = data.daily.temperature_2m_max;
      weatherCodes = data.daily.weathercode;
      for (let i = 0; i < dates.length; i++) {
        const condition = getWeatherDescription(weatherCodes[i]);
        const line = `${dates[i]},${minTemps[i]},${maxTemps[i]},${weatherCodes[i]},${condition}\n`;
        res += line;
        //console.log(line);
      }
    })
    .catch((error) => {
      res = "Sorry, weather data is not available for these dates";
    });
  const weather_text = res;

  /*********Open AI APi*******/
  const url = "https://api.openai.com/v1/chat/completions";
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

  /***********Route Itinerary**********/
  let route_text = "";
  if (route_id !== "") {
    const routePrompt = `You are an AI travel assistant. Based on the following details, create a road journey plan. it is only from the pickup to destination place:
    - *Pickup Location*: ${pickup}
    - *Destination*: ${dest_name}
    - *Route*: ${route_name}
    - *Attractions*: ${route_attractions}
    - *Stay Time*: ${route_time} days
    - *Hotel*: ${route_hotel}
    
     Please write recommendations, attractions to visit, activities to do, places to eat, and accommodations.donot  add alot of details. Do not seperate into different sections by days`;

    const routebody = {
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: routePrompt,
        },
      ],
      temperature: 0.7,
    };

    res = "";
    await fetch(`${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify(routebody),
    })
      .then((response) => response.json())
      .then((data) => {
        res += data.choices[0].message.content;
      })
      .catch((error) => {
        res = "Route data could not be fetched.";
      });

    route_text = res;
  }

  /*******Itinerary Generation*******/

  const prompt_text = `Act as a trip advisor to make an itinerary. The itinerary should include an overview of the destination on top, daily details such as places to visit, dining options, and any other relevant activities or experiences. Each day's format should be: day X description: ..., Details: morning, Midday, Afternoon, evening. Do not add cost after each day.
    Use the exact names of attractions as given below.
    At the end, make the whole itinerary in an Excel format. It should contain:
    - Day
    - Time (hour-wise for each day like 9:00-10:00 am etc.)
    - Activity
    - Description
    the format should be same as :
    | Day            | Time            | Activity                       | Description                                                                                  |
    |----------------|-----------------|--------------------------------|----------------------------------------------------------------------------------------------|
    |Sunday, August 4| 9:00-10:00 am   | abc                            | Arrive at abc and check into the ABC Hotel

    If user selects Skardu, do not add Skardu Fort as it is not a place.
    The start and end dates are: ${start} and ${end}. Use the dates along with day number in detail and Excel both. While adding attractions, mention that ticket price is inclusive of activities like boating, jet skiing, etc. For attractions that involve jeep rides or special activities, provide details about the type of ride (jeep/car) and the ticket price for the activities.
    Create a detailed ${pack_name} itinerary for a trip to ${dest_name} for ${days} days for ${
    Number(adults) + Number(children)
  } people.
    Here are the details:
    - Attractions: ${att_names.join(", ")}
    - Total Number of Adults: ${adults}
    - Total Time Period: ${days} days
    - Total children under 3: ${children}
    - Travel: By ${transport_means}
    Please provide a day-by-day itinerary with recommendations on places to visit, where to eat, and how to get around. donot mention the costs to the user.  Also, include the itinerary mentioning hours.
    donot mention any kind of cost detail to user. i dont want user to know any cost.
    The response should have seperate sections for overview, each day and one section for Excel format. Seperate each section with a line of "----------" 10 dashes. Do not include anything else`;

  const body = {
    model: "gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: prompt_text,
      },
    ],
    temperature: 0.7,
  };

  res = "";
  await fetch(`${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((data) => {
      res += data.choices[0].message.content;
    })
    .catch((error) => {
      res = "Itinerary data could not be fetched";
    });

  const lines = res.split("\n");

  let text_strings: string[] = [];
  let mystring: string = "";

  lines.forEach((line, index) => {
    if (line.startsWith("----------")) {
      text_strings.push(mystring);
      mystring = "";
    } else {
      mystring += line;
      mystring += "\n";
    }
  });
  text_strings.push(mystring);

  /**************Sales Data*******/
  const salesPrompt = `Use the user Itinerary as assistant.
  Create a detailed cost breakdown for the sales team in pkr. The breakdown should include all expenses such as accommodation, dining, transportation, attractions, miscellaneous, refreshments, guide, and driver costs for the selected package.

    - Destination: ${dest_name}
    - Time Period: ${days} days
    - Total People: ${adults} adults and ${children} children
    - Package: ${pack_name}
    - Travel: ${transport_means} 

    Costs:
    - Accommodation cost per night 
    - Dining cost per meal
    - Transportation cost per day
    - Attraction total cost
    - Misc cost per day
    - Refreshment cost per day
    - Guide cost per day
    - Car rate per day
    - Driver cost per day`;

  const body3 = {
    model: "gpt-4o-mini",
    messages: [
      {
        role: "assistant",
        content: res,
      },
      {
        role: "user",
        content: salesPrompt,
      },
    ],
    temperature: 0.7,
  };

  let salesText = "";
  await fetch(`${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify(body3),
  })
    .then((response) => response.json())
    .then((data) => {
      salesText += data.choices[0].message.content;
    })
    .catch((error) => {
      salesText = "Sales data could not be fetched";
    });
  console.log(salesText);

  /*******************/
  const responseObject: Response_Object = {
    text: res,
    weather_text: weather_text,
    text_strings: text_strings,
    lats: att_lats,
    longs: att_longs,
    names: att_names,
    Imageurls: att_images,
    routeText: route_text,
    sales_text: salesText,
    itinerary_id: itinerary_num,
  };

  return responseObject;
}

function calculateDaysBetween(start: string, end: string): number {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const differenceInTime = endDate.getTime() - startDate.getTime();
  const differenceInDays = differenceInTime / (1000 * 3600 * 24);
  return differenceInDays + 1;
}

function getWeatherDescription(code: any) {
  const descriptions: any = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Depositing rime fog",
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Dense drizzle",
    56: "Light freezing drizzle",
    57: "Dense freezing drizzle",
    61: "Light rain",
    63: "Moderate rain",
    65: "Heavy rain",
    66: "Light freezing rain",
    67: "Heavy freezing rain",
    71: "Light snow",
    73: "Moderate snow",
    75: "Heavy snow",
    77: "Snow grains",
    80: "Light rain showers",
    81: "Moderate rain showers",
    82: "Heavy rain showers",
    85: "Light snow showers",
    86: "Heavy snow showers",
    95: "Thunderstorms",
    96: "Thunderstorms with hail",
    99: "Thunderstorms with heavy hail",
  };
  return descriptions[code] || "Unknown";
}
