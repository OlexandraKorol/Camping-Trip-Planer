export interface WeatherData {
  location?: {
    name: string;
  };
  current: {
    temp_c: number;
    condition: {
      text: string;
      icon: string;
    };
    wind_kph: number;
    wind_dir: string;
    feelslike_c: number;
    humidity: number;
    precip_mm: number;
    uv: number;
    vis_km: number;
    pressure_mb: number;
    gust_kph: number;
  },
  day?: {
    temp_c: number;
    condition: {
      text: string;
      icon: string;
    };
    uv:number
    maxwind_kph: number;
    avghumidity: number;
    maxtemp_c: number;
    mintemp_c: number;
  },
}