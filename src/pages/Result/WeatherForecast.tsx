import { useEffect, useState } from 'react';
import { getWeatherForecastApi } from '../../api/weatherForecast';
import { LocationType } from '../../types/location';

interface WeatherForecastProps {
  selectedDate: Date | null;
  selectedLocation: LocationType | null;
  onWeatherUpdate: (weather: string) => void;
}

export const useWeatherForecast = ({
  selectedDate,
  selectedLocation,
  onWeatherUpdate,
}: WeatherForecastProps) => {
  const [weatherForecast, setWeatherForecast] = useState<string>('날씨 조회 중...');

  useEffect(() => {
    const fetchWeatherForecast = async () => {
      if (!selectedDate || !selectedLocation?.lat || !selectedLocation?.lng) {
        const defaultWeather = '화창할';
        setWeatherForecast(defaultWeather);
        onWeatherUpdate(defaultWeather);
        return;
      }

      try {
        const formattedDate = selectedDate
          .toISOString()
          .split('T')[0]
          .replace(/-/g, '');
        const response = await getWeatherForecastApi({
          date: formattedDate,
          latitude: selectedLocation.lat,
          longitude: selectedLocation.lng,
        });

        const weather = response.result === '날씨 정보를 찾을 수 없습니다.' ? '화창할' : response.result;
        setWeatherForecast(weather);
        onWeatherUpdate(weather);
      } catch (error) {
        console.error('날씨 정보 조회 실패:', error);
        const defaultWeather = '화창할';
        setWeatherForecast(defaultWeather);
        onWeatherUpdate(defaultWeather);
      }
    };

    fetchWeatherForecast();
  }, [selectedDate, selectedLocation, onWeatherUpdate]);

  return weatherForecast;
};
