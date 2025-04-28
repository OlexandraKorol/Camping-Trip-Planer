import { useState } from "react";
import { WeatherData } from "../types/WeatherData";

const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export const useWeather = () => {
  const [city, setCity] = useState("");
  const [date, setDate] = useState<string>("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState("");

  const fetchWeather = async () => {
    try {
      setLoading(true);

      const today = new Date();
      const selectedDate = new Date(date);

      let endpoint = "";

      if (date) {
        if (selectedDate < today) {
          endpoint = `https://api.weatherapi.com/v1/history.json?key=${WEATHER_API_KEY}&q=${city}&dt=${date}&lang=en`;
        } else {
          endpoint = `https://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${city}&days=14&lang=en`;
        }
      } else {
        endpoint = `https://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${city}&lang=en`;
      }
      const res = await fetch(endpoint);

      if (!res.ok) {
        setError(true);
        setErrorText(
          `${res.statusText}, please, check for mistakes, or try again later`
        );
        throw new Error("Failed to fetch weather data");
      }

      const data = await res.json();
      const location = data.location;
      if (endpoint.includes("forecast.json") && date) {
        const foundDay = data.forecast.forecastday.find(
          (day: any) => day.date === date
        );

        if (foundDay) {
          console.log({ weather }, "forecast.json");
          setWeather({ location, ...foundDay });
        } else {
          setError(true);
          setErrorText("No forecast data available for selected date.");
        }
      } else if (endpoint.includes("history.json")) {
        setWeather({ location, ...data.forecast.forecastday[0] });
      } else {
        console.log({ weather }, "++++");
        setWeather({ location, ...data });
      }

      setError(false);
    } catch (e) {
      setError(true);
      setErrorText(
        e instanceof Error
          ? `${e.message}, please, check for mistakes, or try again later`
          : "An unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);

    if (error) {
      setError(false);
      setErrorText("");
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
    date,
    handleDateChange,
  };
}; // Отримати регіон, локацію. оптимізувати логіку
