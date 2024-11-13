import { ApiResponse, RecommendResponse } from '../types/recommendation';

import axios from 'axios';

// 재시도 함수
const retryAxios = async (
  fn: () => Promise<any>,
  retries: number = 3,
  interval: number = 2000,
): Promise<any> => {
  try {
    return await fn();
  } catch (error) {
    if (retries === 0) throw error;
    console.log(`Retrying... Attempts remaining: ${retries}`);
    await new Promise((resolve) => setTimeout(resolve, interval));
    return retryAxios(fn, retries - 1, interval);
  }
};

export const fetchRecommendations = async (requestData: any) => {
  // 요청 데이터 로깅
  console.log('Request Data:', {
    url: '/api/recommend',
    method: 'POST',
    data: requestData,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

  try {
    const response = await retryAxios(
      () =>
        axios.post<ApiResponse>('/api/recommend', requestData, {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 30000,
          signal: AbortSignal.timeout(35000),
        }),
      3,
      2000,
    );

    // 응답 데이터 로깅
    console.log('response: ', response);
    console.log('response.data:', response.data);
    console.log('response.data.result: ', response.data.result);
    console.log('Type of response:', typeof response);
    console.log('Type of response.data:', typeof response.data);
    console.log('Type of response.data.result:', typeof response.data.result);
    console.log(
      'Is response.data.result an array?',
      Array.isArray(response.data.result),
    );
    console.log('response.data.isSuccess : ', response.data.isSuccess);

    if (!response.data) {
      throw new Error('No data received from server');
    }

    if (response.data.result && Array.isArray(response.data.result)) {
      const transformedData = response.data.result.map((item) => ({
        id: item._id || '',
        name: item.VISIT_AREA_NM || '이름 없음',
        lat: item.LATITUDE || 0,
        lng: item.LONGITUDE || 0,
        description: item.LOTNO_ADDR || item.ROAD_NM_ADDR || '주소 정보 없음',
        courseType: item.VISIT_AREA_TYPE_CD || '미분류',
        isSelected: false,
        image: '/src/assets/image/placeholder.jpg',
      }));

      console.log(transformedData);
      return transformedData;
    } else {
      throw new Error('Response data is not an array');
    }
  } catch (error) {
    // 에러 상세 로깅
    console.error('Error details:', {
      error,
      isAxiosError: axios.isAxiosError(error),
      errorMessage: error instanceof Error ? error.message : 'Unknown error',
      errorStack: error instanceof Error ? error.stack : undefined,
    });

    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNABORTED') {
        throw new Error(
          'Request timeout after multiple retries - please try again later',
        );
      }
      if (error.response) {
        console.error('Server error details:', {
          status: error.response.status,
          statusText: error.response.statusText,
          data: error.response.data,
        });
        throw new Error(
          `Server error: ${error.response.status} - ${error.response.statusText}`,
        );
      } else if (error.request) {
        throw new Error(
          'No response from server - please check your connection',
        );
      }
    }
    throw new Error('Failed to fetch recommendations');
  }
};
