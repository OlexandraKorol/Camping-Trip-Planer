import { useState } from "react";
import { WeatherData } from "../types/WeatherData";

const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export const useWeather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState("");

  const fetchWeather = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${city}&lang=en`
      );

      if (!res.ok) {
        setError(true);
        setErrorText(`${res.statusText}, please, check for mistakes, or try again later`);
        throw new Error("Failed to fetch weather data");
      }

      const data = await res.json();
      setWeather(data);
      setError(false);
    } catch (e) {
      setError(true);
      setErrorText(e instanceof Error ? `${e.message}, please, check for mistakes, or try again later` : "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);

    if (error) {
      setError(false);
      setErrorText("");
    }
  };

  const onCheckWeather = () => {
    if (!city.length) {
      setError(true);
      setErrorText("Please, enter address");
      return;
    }

    fetchWeather();
  };

  return {
    city,
    weather,
    error,
    loading,
    errorText,
    setCity,
    handleInputChange,
    onCheckWeather,
  };
};