export interface WeatherData {
  location: {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    tz_id: string;
    localtime_epoch: number;
    localtime: string;
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
  };
}