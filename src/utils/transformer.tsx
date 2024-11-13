import { LocationType } from '../types/location';
import { RecommendResponse } from '../types/recommendation';

export const transformToLocationType = (apiResponse: any): LocationType[] => {
  // API 응답 구조에서 결과 배열을 추출
  const responseData = apiResponse?.result || apiResponse;

  if (!Array.isArray(responseData)) {
    console.warn('No valid data array found in response:', apiResponse);
    return [];
  }

  try {
    return responseData.map((item: RecommendResponse, index: number) => {
      // 주소 정보 처리
      const address =
        item.ROAD_NM_ADDR && !Number.isNaN(Number(item.ROAD_NM_ADDR))
          ? item.ROAD_NM_ADDR
          : item.LOTNO_ADDR || '주소 정보 없음';

      // 위도/경도 확인
      const lat = Number(item.LATITUDE);
      const lng = Number(item.LONGITUDE);

      if (isNaN(lat) || isNaN(lng)) {
        console.warn('Invalid coordinates for item:', item);
      }

      // 운영시간 정보 정리
      const operationHour = item.OPERATION_HOUR
        ? item.OPERATION_HOUR.split('\n')[0]
        : '운영시간 정보 없음';

      // 설명 정보 구성
      const description = [
        `주소: ${address}`,
        `영업시간: ${operationHour}`,
        `전화번호: ${item.PHONE_NUMBER || '전화번호 정보 없음'}`,
      ].join('\n');

      return {
        id: index + 1,
        name: item.VISIT_AREA_NM || '이름 없음',
        courseType: item.VISIT_AREA_TYPE_CD || '미분류',
        isSelected: index === 0,
        lat: lat || 0,
        lng: lng || 0,
        image: '/src/assets/image/placeholder.jpg',
        description: description,
      };
    });
  } catch (error) {
    console.error('Transform error:', error);
    return [];
  }
};
