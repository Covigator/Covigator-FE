import { ApiResponse, RecommendResponse } from '../types/recommendation';

import axios from 'axios';

const formatAddress = (
  roadAddr: string | number,
  lotnoAddr: string | number,
): string => {
  // NaN 체크 및 문자열 처리
  const road =
    Number.isNaN(Number(roadAddr)) || roadAddr === 'NaN'
      ? ''
      : String(roadAddr);
  const lotno =
    Number.isNaN(Number(lotnoAddr)) || lotnoAddr === 'NaN'
      ? ''
      : String(lotnoAddr);

  // 도로명 주소 우선, 없으면 지번 주소 사용
  return road || lotno || '주소 정보 없음';
};
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
    console.log('Type of response:', typeof response);
    console.log('Type of response.data:', typeof response.data);

    let parsedData;
    if (typeof response.data === 'string') {
      // NaN을 "NaN"으로 치환한 후 파싱
      try {
        const sanitizedData = response.data.replace(/:\s*NaN/g, ':"NaN"');
        parsedData = JSON.parse(sanitizedData);
      } catch (parseError) {
        console.error('Parse error:', parseError);
        console.error('Original data:', response.data);
        console.error('Sanitized data:', sanitizedData);
        throw new Error('Failed to parse response data');
      }
    } else {
      // 이미 객체인 경우
      parsedData = response.data;
    }

    console.log('Parsed data:', parsedData);

    if (!parsedData || !parsedData.result) {
      console.error('Missing result field:', parsedData);
      throw new Error('Invalid response format: missing result field');
    }

    const results = Array.isArray(parsedData.result)
      ? parsedData.result
      : [parsedData.result];

    console.log('Processing results:', results);

    console.log('Parsed data:', parsedData);

    if (!parsedData || !parsedData.result) {
      console.error('Invalid response structure:', parsedData);
      throw new Error('Invalid response format: missing result field');
    }

    console.log('Processing results:', results);

    const transformedData = results.map((item) => {
      const lat = Number(item.LATITUDE);
      const lng = Number(item.LONGITUDE);

      const address = formatAddress(item.ROAD_NM_ADDR, item.LOTNO_ADDR);

      const operationHour =
        item.OPERATION_HOUR && item.OPERATION_HOUR !== 'NaN'
          ? item.OPERATION_HOUR
          : '영업시간 정보 없음';

      const phoneNumber =
        item.PHONE_NUMBER && item.PHONE_NUMBER !== 'NaN'
          ? item.PHONE_NUMBER
          : '전화번호 정보 없음';

      return {
        id: item._id || '',
        name: item.VISIT_AREA_NM || '이름 없음',
        lat: Number.isNaN(lat) ? 0 : lat,
        lng: Number.isNaN(lng) ? 0 : lng,
        description: [
          `주소: ${address}`,
          `영업시간: ${operationHour}`,
          `전화번호: ${phoneNumber}`,
        ].join('\n'),
        courseType: item.VISIT_AREA_TYPE_CD || '미분류',
        isSelected: false,
        image: '/src/assets/image/placeholder.jpg',
      };
    });

    console.log('Transformed data:', transformedData);
    return transformedData;
  } catch (error) {
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
    throw error;
  }
};