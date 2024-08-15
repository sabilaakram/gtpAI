// components/WeatherWidget.tsx
import React from "react";
import {
  FaSun,
  FaCloud,
  FaCloudRain,
  FaSnowflake,
  FaBolt,
} from "react-icons/fa";
import "../weather.css";

interface WeatherWidgetProps {
  date: string;
  minTemp: number;
  maxTemp: number;
  weatherCode: number;
  condition: string;
}

const getWeatherIcon = (code: number) => {
  const iconStyle = { color: "orange", fontSize: "24px" };
  const icons: any = {
    0: <FaSun style={{ ...iconStyle, color: "yellow" }} />,
    1: <FaSun style={{ ...iconStyle, color: "yellow" }} />,
    2: <FaCloud style={{ ...iconStyle, color: "gray" }} />,
    3: <FaCloud style={{ ...iconStyle, color: "gray" }} />,
    45: <FaCloud style={{ ...iconStyle, color: "gray" }} />,
    48: <FaCloud style={{ ...iconStyle, color: "gray" }} />,
    51: <FaCloudRain style={{ ...iconStyle, color: "blue" }} />,
    53: <FaCloudRain style={{ ...iconStyle, color: "blue" }} />,
    55: <FaCloudRain style={{ ...iconStyle, color: "blue" }} />,
    56: <FaCloudRain style={{ ...iconStyle, color: "blue" }} />,
    57: <FaCloudRain style={{ ...iconStyle, color: "blue" }} />,
    61: <FaCloudRain style={{ ...iconStyle, color: "blue" }} />,
    63: <FaCloudRain style={{ ...iconStyle, color: "blue" }} />,
    65: <FaCloudRain style={{ ...iconStyle, color: "blue" }} />,
    66: <FaCloudRain style={{ ...iconStyle, color: "blue" }} />,
    67: <FaCloudRain style={{ ...iconStyle, color: "blue" }} />,
    71: <FaSnowflake style={{ ...iconStyle, color: "lightblue" }} />,
    73: <FaSnowflake style={{ ...iconStyle, color: "lightblue" }} />,
    75: <FaSnowflake style={{ ...iconStyle, color: "lightblue" }} />,
    77: <FaSnowflake style={{ ...iconStyle, color: "lightblue" }} />,
    80: <FaCloudRain style={{ ...iconStyle, color: "blue" }} />,
    81: <FaCloudRain style={{ ...iconStyle, color: "blue" }} />,
    82: <FaCloudRain style={{ ...iconStyle, color: "blue" }} />,
    85: <FaSnowflake style={{ ...iconStyle, color: "lightblue" }} />,
    86: <FaSnowflake style={{ ...iconStyle, color: "lightblue" }} />,
    95: <FaBolt style={{ ...iconStyle, color: "yellow" }} />,
    96: <FaBolt style={{ ...iconStyle, color: "yellow" }} />,
    99: <FaBolt style={{ ...iconStyle, color: "yellow" }} />,
  };
  return icons[code] || <FaSun style={{ ...iconStyle, color: "yellow" }} />;
};

const WeatherWidget: React.FC<WeatherWidgetProps> = ({
  date,
  minTemp,
  maxTemp,
  weatherCode,
  condition,
}) => {
  const icon = getWeatherIcon(weatherCode);

  return (
    <div className="weather-widget">
      <div className="date">{date}</div>
      <div className="icon">{icon}</div>
      <div className="condition">{condition}</div>
      <div className="temperature">
        <span className="min-temp">{minTemp}°C</span> /<br></br>
        <span className="max-temp">{maxTemp}°C</span>
      </div>
    </div>
  );
};

export default WeatherWidget;
