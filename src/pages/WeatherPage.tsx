import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import backgroundImage from "../assets/weather_page_background.png";
import { CustomTextField } from "../components/CustomTextField";
import { CheckWeatherButton } from "../components/CustomButtons";
import { WeatherDetails } from "../components/WeatherDetails";
import { useWeather } from "../hooks/useWeather";

export const WeatherPage = () => {
  const {
    city,
    weather,
    error,
    loading,
    errorText,
    handleInputChange,
    onCheckWeather,
    date,
    handleDateChange
  } = useWeather();

  return (
    <div
      className="container flex h-screen min-w-full flex-col bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <ActionContainer>
        <div className="flex flex-row justify-beetwen w-full gap-15 pb-3">
          <CustomTextField
            type="text"
            placeholder="Enter city or location"
            value={city}
            required
            onChange={handleInputChange}
            name={"weather"}
            error={error}
          />
          <CustomTextField
            type="date"
            placeholder="Select date"
            value={date}
            onChange={handleDateChange}
            name={"date"}
            error={error}
          />
        </div>
        <CheckWeatherButton onCheckButton={onCheckWeather} />
        {error && (
          <Typography variant="caption" textAlign="center" color="error">
            {errorText}
          </Typography>
        )}
      </ActionContainer>

      {weather && !loading && <WeatherDetails weather={weather} />}

      {loading && (
        <Typography variant="h6" textAlign="center">
          Loading...
        </Typography>
      )}
    </div>
  );
};

const ActionContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "max-content",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: theme.spacing(4),
}));