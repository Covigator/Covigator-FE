import { PlaceResponse } from '../types/place';
import { convertObjectPropertiesSnakeCaseToCamelCase } from '../utils/common';
import instance from './instance';

import axios, { AxiosError } from 'axios';

interface PlacesParams {
  name: string;
  address: string;
}

export const getPlaces = async ({
  name,
  address,
}: PlacesParams): Promise<PlaceResponse> => {
  try {
    const response = await instance.get<PlaceResponse>('/places', {
      params: {
        name,
        address,
      },
    });

    const convertedResponse = convertObjectPropertiesSnakeCaseToCamelCase(
      response,
    ) as PlaceResponse;

    return convertedResponse;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        throw new Error(
          `장소 조회 실패: ${axiosError.response.status} - ${axiosError.response.data}`,
        );
      } else if (axiosError.request) {
        throw new Error('장소 조회 실패: 서버로부터 응답을 받지 못했습니다');
      } else {
        throw new Error(`장소 조회 실패: ${axiosError.message}`);
      }
    } else {
      throw new Error('장소 조회 중 예기치 않은 오류가 발생했습니다');
    }
  }
};
