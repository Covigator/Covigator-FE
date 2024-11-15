import { WeatherForecastResponse } from '../types/weatherForecast';
import { convertObjectPropertiesSnakeCaseToCamelCase } from '../utils/common';
import instance from './instance';

import axios, { AxiosError } from 'axios';

interface WeatherForecastParams {
  date: string;
  latitude: number;
  longitude: number;
}

/** GET: 날씨 예보 조회 */
export const getWeatherForecastApi = async ({
  date,
  latitude,
  longitude,
}: WeatherForecastParams): Promise<WeatherForecastResponse> => {
  try {
    // 날씨 예보 조회 요청 보내기
    const response = await instance.get('/weather-forecast', {
      params: {
        date,
        latitude,
        longitude,
      },
    });

    const convertedResponse = convertObjectPropertiesSnakeCaseToCamelCase(
      response.data,
    ) as WeatherForecastResponse;

    return convertedResponse;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        // 서버가 2xx 범위를 벗어나는 상태 코드로 응답한 경우
        throw new Error(
          `날씨 예보 조회 실패: ${axiosError.response.status} - ${axiosError.response.data}`,
        );
      } else if (axiosError.request) {
        // 요청은 보냈지만 응답을 받지 못한 경우
        throw new Error(
          '날씨 예보 조회 실패: 서버로부터 응답을 받지 못했습니다',
        );
      } else {
        // 요청 설정 중 오류가 발생한 경우
        throw new Error(`날씨 예보 조회 실패: ${axiosError.message}`);
      }
    } else {
      // Axios 오류가 아닌 경우
      throw new Error('날씨 예보 조회 중 예기치 않은 오류가 발생했습니다');
    }
  }
};
