import { Box, styled, Typography } from "@mui/material";
import { WeatherData } from "../types/WeatherData";

interface WeatherDetailsProps {
  weather: WeatherData;
}

export const WeatherDetails = ({ weather }: WeatherDetailsProps) => {

  const weatherDetails = [
    { label: "💨 Wind", value: `${weather.current.wind_kph} kph (${weather.current.wind_dir})` },
    { label: "🌡️ Feels like", value: `${weather.current.feelslike_c}°C` },
    { label: "💧 Humidity", value: `${weather.current.humidity}%` },
    { label: "☔ Precipitation", value: `${weather.current.precip_mm} mm` },
    { label: "🌞 UV Index", value: `${weather.current.uv}` },
    { label: "👁️ Visibility", value: `${weather.current.vis_km} km` },
    { label: "📈 Pressure", value: `${weather.current.pressure_mb} mb` },
    { label: "💨 Gusts", value: `${weather.current.gust_kph} kph` },
  ];

  return (
    <WeatherContainer className="mt-4">
      <WeatherTitle>
        <Typography gutterBottom sx={{ mb: 1.5 }} variant="h2" textAlign="center">
          {weather.location.name}
        </Typography>
        <img src={weather.current.condition.icon} alt="weather icon" />
      </WeatherTitle>

      <Typography gutterBottom variant="h5" textAlign="center">
        {weather.current.temp_c}°C — {weather.current.condition.text}
      </Typography>

      <Box sx={{ mt: 3, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
        {weatherDetails.map((detail, index) => (
          <Typography key={index}>
            {detail.label}: {detail.value}
          </Typography>
        ))}
      </Box>
    </WeatherContainer>
  );
};

const WeatherContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "flex-start",
  padding: theme.spacing(4),
}));

const WeatherTitle = styled(Box)(({ theme }) => ({
  width: '100%',
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  padding: theme.spacing(4),
}));
