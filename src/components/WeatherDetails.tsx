import { Box, styled, Typography } from "@mui/material";
import { WeatherData } from "../types/WeatherData";

interface WeatherDetailsProps {
  weather: WeatherData;
}

export const WeatherDetails: React.FC<WeatherDetailsProps> = ({ weather }) => {
  const isCurrentWeather = !!weather.current;

  const temperature = isCurrentWeather
    ? weather.current.temp_c
    : weather.day?.temp_c;
  const conditionText = isCurrentWeather
    ? weather.current.condition.text
    : weather.day?.condition.text;
  const conditionIcon = isCurrentWeather
    ? weather.current.condition.icon
    : weather.day?.condition.icon;

  const weatherDetails = isCurrentWeather
    ? [
      { label: "💨 Wind", value: `${weather.current.wind_kph} kph (${weather.current.wind_dir})` },
      { label: "🌡️ Feels like", value: `${weather.current.feelslike_c}°C` },
      { label: "💧 Humidity", value: `${weather.current.humidity}%` },
      { label: "☔ Precipitation", value: `${weather.current.precip_mm} mm` },
      { label: "🌞 UV Index", value: `${weather.current.uv}` },
      { label: "👁️ Visibility", value: `${weather.current.vis_km} km` },
      { label: "📈 Pressure", value: `${weather.current.pressure_mb} mb` },
      { label: "💨 Gusts", value: `${weather.current.gust_kph} kph` },
    ]
    : [
      { label: "💨 Max Wind", value: `${weather.day?.maxwind_kph} kph` },
      { label: "💧 Avg Humidity", value: `${weather.day?.avghumidity}%` },
      { label: "🌡️ Max Temp", value: `${weather.day?.maxtemp_c}°C` },
      { label: "🌡️ Min Temp", value: `${weather.day?.mintemp_c}°C` },
    ];

  const locationName = weather.location ? weather.location.name : "Unknown Location";

  return (
    <WeatherContainer>
      <WeatherTitle>
        <Typography gutterBottom sx={{ mb: 1.5 }} variant="h2" textAlign="center">
          {locationName}
        </Typography>
        {conditionIcon && <img src={conditionIcon} alt="weather icon" />}
      </WeatherTitle>

      <Typography gutterBottom variant="h5" textAlign="center">
        {temperature}°C — {conditionText}
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
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "flex-start",
  padding: theme.spacing(4),
}));

const WeatherTitle = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  padding: theme.spacing(4),
}));