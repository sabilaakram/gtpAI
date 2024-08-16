"use client";

import React, { useState, useEffect, useRef } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { generateItenary } from "../action";
import StyleResponse from "./StyleResponse";
import { GoogleMapsEmbed } from "@next/third-parties/google";
import GtpMaps from "./GtpMaps";
import ExpandableSection from "./Expandable";
import ExcelCreate from "./ExcelCreate";
import "../formStyling.css";

import { Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import MyProgressBar from "./MyProgress";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { sendEmail } from "../sendEmail";
import WeatherWidget from "./WeatherWidget";
import GuessTheNumber from "./GuessTheNumber";
import Game from "./game";
import Image from "next/image";

const parseWeatherString = (weatherString: string) => {
  const weatherData = weatherString
    .trim()
    .split("\n")
    .map((line) => {
      const [date, minTemp, maxTemp, weatherCode, condition] = line.split(",");
      return {
        date,
        minTemp: parseFloat(minTemp),
        maxTemp: parseFloat(maxTemp),
        weatherCode: parseInt(weatherCode, 10),
        condition,
      };
    });
  return weatherData;
};

function filterLines(inputString: string, startChar: string) {
  return inputString
    .split("\n") // Split the string into an array of lines
    .filter((line) => line.startsWith(startChar)) // Filter lines that start with the specified character
    .join("\n"); // Join the remaining lines back into a single string
}
/***************/
function removeExcel(itinerary: string): string {
  const lines = itinerary.split("\n");
  let ex = 0;
  lines.forEach((line, index) => {
    if (line.startsWith("----------")) {
      ex = index;
    }
  });
  const noexcel = lines.slice(0, ex).join("\n");
  return noexcel;
}
/***************/

function formatDateFrontEnd(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
}

function formatDateToYYYYMMDD(date: Date): string {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}
const getCurrentDate = () => {
  const now = new Date(Date.now());
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const pakistani_cities = [
  "Karachi",
  "Lahore",
  "Faisalabad",
  "Rawalpindi",
  "Multan",
  "Gujranwala",
  "Peshawar",
  "Quetta",
  "Islamabad",
  "Sialkot",
  "Bahawalpur",
  "Sargodha",
  "Sukkur",
  "Larkana",
  "Sheikhupura",
  "Jhang",
  "Rahim Yar Khan",
  "Gujrat",
  "Kasur",
  "Mardan",
  "Mingaora",
  "Okara",
  "Nawabshah",
  "Chiniot",
  "Kotli",
  "Khuzdar",
  "Dera Ghazi Khan",
  "Muzaffargarh",
  "Sadiqabad",
  "Mirpur Khas",
  "Bannu",
  "Turbat",
  "Parachinar",
  "Muridke",
  "Chaman",
  "Gwadar",
  "Mandi Bahauddin",
  "Attock",
  "Bahawalnagar",
  "Jhelum",
  "Sahiwal",
  "Khushab",
  "Daska",
  "Khanewal",
  "Muzaffarabad",
  "Abbotabad",
  "Shikarpur",
  "Kundian",
  "Hafizabad",
  "Kot Addu",
  "Kohat",
  "Jacobabad",
  "Shahdadkot",
  "Mansehra",
  "Kamalia",
  "Mianwali",
  "Tando Allahyar",
  "Vihari",
  "Gojra",
  "Tando Muhammad Khan",
  "Khairpur",
  "Dera Ismail Khan",
  "Chishtian",
  "Charsadda",
  "Kāmra",
  "Swabi",
  "Nowshera",
  "Jaranwala",
  "Chakwal",
  "Bhalwal",
  "Haripur",
  "Dadu",
  "Pakpattan",
  "Tando Jam",
  "Layyah",
  "Burewala",
  "Dipalpur",
  "Badin",
  "Jamshoro",
  "Kotri",
  "Tando Adam",
  "Hasilpur",
  "Arifwala",
  "Chichawatni",
  "Samundri",
  "Pasrur",
  "Moro",
  "Manawan",
  "Sambrial",
  "Chiniot",
  "Raiwind",
  "Kamoke",
  "Kashmor",
  "Ahmedpur East",
  "Kot Mumin",
];

const Destinationform = ({
  destinationData,
  packageData,
  routeData,
  itineraryNumber,
}: {
  destinationData: string[][];
  packageData: string[][];
  routeData: string[][];
  itineraryNumber: number;
}) => {
  const [result, setResult] = useState<string | null>(null);
  const [routeResponse, setRouteResponse] = useState<string>("");
  const [salesResponse, setSalesResponse] = useState<string>("");
  const [xlData, setXlData] = useState<string | null>(null);
  const [weatherData, setWeatherData] = useState<string | null>(null);
  const [textStrings, setTextStrings] = useState<string[] | null>(null);
  const [lats, setLats] = useState<string[] | null>(null);
  const [longs, setLongs] = useState<string[] | null>(null);
  const [attractions, setAttractions] = useState<string[] | null>(null);
  const [attImages, setAttImages] = useState<string[] | null>(null);

  const [loading, setLoading] = useState<boolean>(false); //For loading animation
  const [pageCount, setPageCount] = useState<number>(0);

  const [selectedPickup, setSelectedPickup] = useState("");
  const [selectedTransport, setSelectedTransport] = useState("car"); // default is "car"
  const [selectedDestination, setSelectedDestination] = useState("");
  const [selectedPackage, setSelectedPackage] = useState("");
  const [destName, setDestName] = useState("");
  const [selectedRoute, setSelectedRoute] = useState("");

  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

  const handleAdultsChange = (amount: any) => {
    setAdults((prev) => Math.max(1, prev + amount));
  };

  const handleChildrenChange = (amount: any) => {
    setChildren((prev) => Math.max(0, prev + amount));
  };

  useEffect(() => {
    const currentDate = getCurrentDate();
    setStartDate(new Date(currentDate));
    setEndDate(new Date(currentDate));
  }, []);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleStartDateChange = (date: any) => {
    setStartDate(date);
    if (date > endDate) {
      setEndDate(date);
    }
  };

  const handleEndDateChange = (date: any) => setEndDate(date);

  const handlePackageSelect = (packageId: any) => {
    setSelectedPackage(packageId);
  };

  const handleDestinationClick = (destination: any, destinationName: any) => {
    setSelectedDestination(destination);
    setSelectedRoute("");
    setDestName(destinationName);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setPageCount(pageCount + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
    event.preventDefault();
    setLoading(true);

    const formData1 = new FormData();

    formData1.append("Pickup", `${selectedPickup}`);
    formData1.append("transport", `${selectedTransport}`);
    formData1.append("Destinations", `${selectedDestination}`);
    formData1.append(
      "Route",
      `${selectedTransport === "car" ? selectedRoute : ""}`
    );
    formData1.append("Packages", `${selectedPackage}`);
    formData1.append("adults", `${adults}`);
    formData1.append("children", `${children}`);
    formData1.append("trip-start", `${formatDateToYYYYMMDD(startDate)}`);
    formData1.append("trip-end", `${formatDateToYYYYMMDD(endDate)}`);

    // Call generateItenary and handle the response
    const ItId = itineraryNumber + 1;
    const response = await generateItenary(formData1, ItId);
    const excelData = filterLines(
      response.text_strings[response.text_strings.length - 1],
      "|"
    );
    setSalesResponse(response.sales_text);
    setResult(response.text);
    setRouteResponse(response.routeText);
    setXlData(excelData);
    setTextStrings(response.text_strings);
    setWeatherData(response.weather_text);
    setLats(response.lats);
    setLongs(response.longs);
    setAttractions(response.names);
    setAttImages(response.Imageurls);
    setLoading(false);

    let emailString = "";
    emailString =
      "**Itinerary ID:**" +
      ItId +
      "\n\n" +
      "**Contact Info:**\n" +
      fullName +
      "\n" +
      email +
      "\n" +
      phoneNumber +
      "\n\n\n\n";

    if (response.routeText !== "") {
      emailString += "*Generated Route:**\n" + response.routeText + "\n\n\n\n";
    }

    emailString +=
      "**Generated Itinerary:**\n" + removeExcel(response.text) + "\n\n\n\n";
    emailString += "**Generated Sales Data:**\n" + response.sales_text;

    await sendEmail(emailString, "Itinerary Generated");

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const [booked, setBooked] = useState<boolean>(false);

  const handleEmailSend = async () => {
    setBooked(true);
    let emailString = "";

    emailString =
      "**Itinerary ID:**" +
      itineraryNumber +
      "\n\n" +
      "**Contact Info:**\n" +
      fullName +
      "\n" +
      email +
      "\n" +
      phoneNumber +
      "\n\n\n\n";

    await sendEmail(emailString, "Trip Booked");
  };

  /**************************/
  // Define the type of the ref explicitly
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const scroll = (direction: string) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      (scrollContainerRef.current as HTMLDivElement).scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const updateScrollButtons = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollWidth > container.clientWidth &&
          container.scrollLeft <
            container.scrollWidth - container.clientWidth - 1
      );
    }
  };

  useEffect(() => {
    updateScrollButtons();
    window.addEventListener("resize", updateScrollButtons);
    return () => window.removeEventListener("resize", updateScrollButtons);
  }, [attractions]); // Add attractions as a dependency to recheck on changes

  useEffect(() => {
    updateScrollButtons();
  }, []);

  /**********/

  /*****Personal Info*******/
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handlePhoneNumberChange = (e: any) => {
    let input = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters

    if (input.length > 4) {
      input = input.slice(0, 4) + "-" + input.slice(4, 11);
    }

    setPhoneNumber(input);
  };

  const isInfoValid = () => {
    const phoneRegex = /^03\d{2}-\d{7}$/;
    return fullName && email && phoneRegex.test(phoneNumber);
  };
  /*********************/

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {pageCount === 0 && (
          <>
            <MyProgressBar progress={25} />
            <h2 className="text-[#2c3e50] text-center sm:text-mdfont text-base">
              Step 1: Personal Information
            </h2>
            <p className="text-[#2c3e50] text-center sm:text-xl text-sm">
              Please provide your contact details to help us tailor your trip
              itinerary.
            </p>
            <h4>Full Name</h4>

            <input
              type="text"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="select-field"
            />

            <h4>Email Address</h4>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="select-field"
            />

            <h4>Phone Number</h4>

            <input
              type="text"
              placeholder="03XX-XXXXXXX"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              className="select-field"
              maxLength={12}
            />

            <button
              className="next-button"
              onClick={() => {
                setPageCount(pageCount + 1);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              type="button"
              disabled={!isInfoValid()}
            >
              Next
            </button>
          </>
        )}
        {pageCount === 1 && (
          <>
            <MyProgressBar progress={50} />
            <h2 className="text-[#2c3e50] text-center sm:text-mdfont text-base">
              Step 2: Travel Details
            </h2>
            <p className="text-[#2c3e50] text-center sm:text-xl text-sm">
              Provide us with your travel specifics so we can create a
              customized itinerary.
            </p>
            <h4>What is your pickup location?</h4>
            <select
              name="Pickup"
              id="Pickup"
              value={selectedPickup}
              onChange={(e) => setSelectedPickup(e.target.value)}
              required
              className="select-field"
            >
              <option value="">Select your city</option>
              {pakistani_cities.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <fieldset className="fieldset">
              <h4>How will you travel?</h4>
              <div className="radio-group">
                <div className="radio-item">
                  <input
                    type="radio"
                    id="car"
                    name="transport"
                    value="car"
                    checked={selectedTransport === "car"}
                    onChange={(e) => setSelectedTransport(e.target.value)}
                    className="radio-input"
                  />
                  <label htmlFor="car" className="radio-label">
                    By Car
                  </label>
                </div>

                <div className="radio-item">
                  <input
                    type="radio"
                    id="plane"
                    name="transport"
                    value="plane"
                    checked={selectedTransport === "plane"}
                    onChange={(e) => setSelectedTransport(e.target.value)}
                    className="radio-input"
                  />
                  <label htmlFor="plane" className="radio-label">
                    By Plane
                  </label>
                </div>
              </div>
              <label
                style={{
                  display: selectedTransport === "plane" ? "inline" : "none",
                  fontStyle: "italic",
                }}
              >
                Our agent will book tickets for you
              </label>
            </fieldset>
            <h4>What destination would you like to visit?</h4>
            <br></br>
            <div className="destination-selector flex-column flex-lg-row">
              {destinationData.slice(1).map((item) => (
                <div
                  key={item[0]}
                  className={`destination-item ${
                    selectedDestination === item[0] ? "selected" : ""
                  }`}
                  onClick={() => handleDestinationClick(item[0], item[1])}
                >
                  <Image
                    src={item[5]}
                    alt={item[1]}
                    width={200}
                    height={200}
                    className="destination-image"
                  />
                  <p className="m-0 d-block">{item[1]}</p>
                </div>
              ))}
            </div>

            {/* Dropdown for routes */}
            {selectedTransport === "car" && selectedDestination && (
              <div className="route-dropdown">
                <h4>What route will you take?</h4>
                <select
                  id="route"
                  onChange={(e) => setSelectedRoute(e.target.value)}
                  className="select-field"
                >
                  <option value="">Select your route</option>
                  {routeData
                    .filter((route) => route[3] === selectedDestination) // Filter routes
                    .map((route) => (
                      <option key={route[0]} value={route[0]}>
                        {route[4]}
                      </option>
                    ))}
                </select>
              </div>
            )}

            <div className="button-container">
              <Button
                className="back-button"
                onClick={() => {
                  setPageCount(pageCount - 1);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                type="button"
              >
                Back
              </Button>
              <Button
                className="next-button"
                onClick={() => {
                  setPageCount(pageCount + 1);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                type="button"
                disabled={
                  !selectedDestination ||
                  !selectedPickup ||
                  (selectedTransport === "car" && !selectedRoute)
                }
              >
                Next
              </Button>
            </div>
          </>
        )}
        {pageCount === 2 && (
          <>
            <MyProgressBar progress={75} />
            <h2 className="text-[#2c3e50] text-center sm:text-mdfont text-base">
              Step 3: When are you travelling?
            </h2>
            <p className="text-[#2c3e50] text-center sm:text-xl text-sm">
              Choose the dates for your trip to help us create an accurate
              itinerary.
            </p>
            <h4>Select your travel dates from the calendar.</h4>
            <div className="date-container">
              <div className="date-group">
                <label htmlFor="start" className="date-label">
                  Start date:
                </label>
                <DatePicker
                  selected={startDate}
                  onChange={handleStartDateChange}
                  minDate={new Date(getCurrentDate())}
                  calendarClassName="large-calendar"
                  inline
                />
              </div>

              <div className="date-group">
                <label htmlFor="end" className="date-label">
                  End date:
                </label>
                <DatePicker
                  selected={endDate}
                  onChange={handleEndDateChange}
                  minDate={startDate}
                  calendarClassName="large-calendar"
                  inline
                />
              </div>
            </div>
            <div className="button-container">
              <Button
                className="back-button"
                onClick={() => {
                  setPageCount(pageCount - 1);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                type="button"
              >
                Back
              </Button>
              <Button
                className="next-button"
                onClick={() => {
                  setPageCount(pageCount + 1);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                type="button"
              >
                Next
              </Button>
            </div>
          </>
        )}
        {pageCount === 3 && (
          <>
            <MyProgressBar progress={100} />
            <h2 className="text-[#2c3e50] text-center sm:text-mdfont text-base">
              Step 4: Choose Your Plan
            </h2>
            <p className="text-[#2c3e50] text-center sm:text-xl text-sm">
              Provide us with your travel specifics so we can create a
              customized itinerary.
            </p>
            <h4>How many people will be accompanying you?</h4>

            <div className="input-group">
              <label htmlFor="adults" className="input-label">
                Adults
              </label>
              <div className="input-controls">
                <button
                  type="button"
                  onClick={() => setAdults(Math.max(1, adults - 1))}
                >
                  -
                </button>
                <span className="input-number">{adults}</span>
                <button type="button" onClick={() => setAdults(adults + 1)}>
                  +
                </button>
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="children" className="input-label">
                Children
              </label>
              <div className="input-controls">
                <button
                  type="button"
                  onClick={() => setChildren(Math.max(0, children - 1))}
                >
                  -
                </button>
                <span className="input-number">{children}</span>
                <button type="button" onClick={() => setChildren(children + 1)}>
                  +
                </button>
              </div>
            </div>
            <br></br>
            <br></br>
            <h4>What package would you like?</h4>
            <br></br>

            <div className="package-selection">
              {packageData.slice(1).map((item) => (
                <div
                  key={item[0]}
                  className={`package-option ${
                    selectedPackage === item[0] ? "selected" : ""
                  }`}
                  onClick={() => handlePackageSelect(item[0])}
                >
                  <Image src={item[5]} alt={item[1]} width={100} height={100} />
                  <span>{item[6].toUpperCase()}</span>
                </div>
              ))}
            </div>

            <br></br>
            <br></br>

            <Button
              type="button"
              onClick={() => {
                setPageCount(pageCount - 1);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="back-button"
            >
              Back
            </Button>
            <div className="block">
              <Button
                type="submit"
                variant="ghost"
                disabled={!selectedPackage}
                style={{
                  backgroundColor: "turquoise", // Green background
                  border: "none", // Remove borders
                  color: "white", // White text
                  padding: "10px 20px", // Some padding
                  fontSize: "16px", // Font size
                  cursor: "pointer", // Pointer/hand icon on hover
                  borderRadius: "5px", // Rounded corners
                  transition: "background-color 0.4s", // Smooth transition for hover effect
                  display: "block",
                  margin: "1em auto 0",
                }}
              >
                Generate Itinerary
              </Button>
            </div>
          </>
        )}
      </form>

      {loading && pageCount === 4 && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className="loading-indicator">
            <Spinner animation="border" role="status" className="spinner">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            <p className="loading-text">Generating your itinerary...</p>

            <div className="hidden md:block">
              <p>Try this game while you wait</p>
              <Game />
            </div>
          </div>
        </div>
      )}

      {!loading &&
        result &&
        lats &&
        longs &&
        attractions &&
        weatherData &&
        textStrings &&
        xlData &&
        pageCount === 4 && (
          <>
            <h2 className="header">Here&apos;s Your Itinerary!</h2>
            <br></br>
            <div className="mainContainer">
              <br></br>
              <div className="leftSide">
                <div className="overviewContainer">
                  <h4>Your {destName} Experience</h4>
                  <p>
                    {formatDateFrontEnd(startDate)} -{" "}
                    {formatDateFrontEnd(endDate)}
                  </p>
                  <br></br>
                  <h6>Overview</h6>
                  <p>
                    <StyleResponse result={textStrings[0]} />
                  </p>
                </div>
                <br></br>
                <div className="attractionsContainer">
                  <div className="paddingAttraction">
                    <h4>Top Attractions in {destName}</h4>
                    <p>Your Guide to {destName}&apos;s Top Sights</p>
                  </div>
                  <div className="scrollWrapper">
                    {canScrollLeft && (
                      <button
                        className="scrollButton left"
                        onClick={() => scroll("left")}
                      >
                        <FaArrowLeft className="arrowIcon" />
                      </button>
                    )}
                    <div
                      className="scrollContainer"
                      ref={scrollContainerRef}
                      onScroll={updateScrollButtons}
                    >
                      {attImages &&
                        attractions.map((attraction, index) => (
                          <div
                            key={index}
                            className="attraction"
                            onClick={() =>
                              window.open(
                                "https://guidetopakistan.pk/",
                                "_blank"
                              )
                            }
                          >
                            <Image
                              src={attImages[index]}
                              alt={attraction}
                              width={300}
                              height={200}
                              className="image"
                            />
                            <p>{attraction}</p>
                          </div>
                        ))}
                    </div>

                    {canScrollRight && (
                      <button
                        className="scrollButton right"
                        onClick={() => scroll("right")}
                      >
                        <FaArrowRight className="arrowIcon" />
                      </button>
                    )}
                  </div>
                </div>
                {routeResponse !== "" && (
                  <>
                    <div className="overviewContainer">
                      <h4>
                        Your journey from {selectedPickup} to {destName}
                      </h4>
                      <br></br>
                      <StyleResponse result={routeResponse} />
                      <br></br>
                    </div>
                    <br></br>
                  </>
                )}
                <div className="overviewContainer">
                  <h4>Itinerary</h4>
                  <p>Plan Your Perfect Trip with Our Detailed Itinerary</p>
                  <br></br>
                  {textStrings.slice(1, -1).map((text, index) => (
                    <ExpandableSection
                      key={index + 2}
                      title={`Day ${index + 1}`}
                    >
                      <StyleResponse result={text} />
                    </ExpandableSection>
                  ))}
                </div>
                <br></br>
                <div className="overviewContainer">
                  <h4>Weather on Your Trip</h4>
                  <br></br>
                  <div className="weather-widgets-container">
                    {parseWeatherString(weatherData).map(
                      (DayWeather, index) => (
                        <WeatherWidget
                          key={index}
                          date={DayWeather.date}
                          minTemp={DayWeather.minTemp}
                          maxTemp={DayWeather.maxTemp}
                          weatherCode={DayWeather.weatherCode}
                          condition={DayWeather.condition}
                        />
                      )
                    )}
                  </div>
                  <br></br>
                </div>
                <br></br>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "30px" }}
                >
                  <ExcelCreate itineraryString={xlData} />
                  <Button
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
                    onClick={() => handleEmailSend()}
                    disabled={booked}
                  >
                    {booked ? "Booked" : "Book Now"}
                  </Button>
                </div>
                {booked && (
                  <p>Our Sales representative will contact you soon!</p>
                )}
              </div>
              <div className="rightSide">
                <GtpMaps lats={lats} longs={longs} names={attractions} />
              </div>
            </div>
            <br></br>
            <br></br>
            <button
              onClick={() => window.location.reload()}
              className="regen-button"
            >
              Generate Again
            </button>
            <br></br>
          </>
        )}
    </div>
  );
};

export default Destinationform;
