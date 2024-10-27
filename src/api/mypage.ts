import { CourseListResponse } from '../types/community';
import { MypageModifyMemberInfo } from '../types/mypage';
import { convertObjectPropertiesSnakeCaseToCamelCase } from '../utils/common';
import instance from './instance';

import axios, { AxiosError } from 'axios';

/** GET: 마이 코스 조회 */
export const getMyCourseApi = async (): Promise<CourseListResponse> => {
  try {
    // 마이 코스 조회 요청 보내기
    const response = await instance.get('/my-page/my-courses');

    const convertedResponse = convertObjectPropertiesSnakeCaseToCamelCase(
      response.data,
    ) as CourseListResponse;

    return convertedResponse;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        // 서버가 2xx 범위를 벗어나는 상태 코드로 응답한 경우
        throw new Error(
          `마이 코스 조회 실패: ${axiosError.response.status} - ${axiosError.response.data}`,
        );
      } else if (axiosError.request) {
        // 요청은 보냈지만 응답을 받지 못한 경우
        throw new Error(
          '마이 코스 조회 실패: 서버로부터 응답을 받지 못했습니다',
        );
      } else {
        // 요청 설정 중 오류가 발생한 경우
        throw new Error(`마이 코스 조회 실패: ${axiosError.message}`);
      }
    } else {
      // Axios 오류가 아닌 경우
      throw new Error('마이 코스 조회 중 예기치 않은 오류가 발생했습니다');
    }
  }
};

/** GET: 찜한 코스 조회 */
export const getLikeCourseApi = async (): Promise<CourseListResponse> => {
  try {
    // 찜한 코스 조회 요청 보내기
    const response = await instance.get('/my-page/dibs-courses');

    const convertedResponse = convertObjectPropertiesSnakeCaseToCamelCase(
      response.data,
    ) as CourseListResponse;

    return convertedResponse;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        // 서버가 2xx 범위를 벗어나는 상태 코드로 응답한 경우
        throw new Error(
          `찜한 코스 조회 실패: ${axiosError.response.status} - ${axiosError.response.data}`,
        );
      } else if (axiosError.request) {
        // 요청은 보냈지만 응답을 받지 못한 경우
        throw new Error(
          '찜한 코스 조회 실패: 서버로부터 응답을 받지 못했습니다',
        );
      } else {
        // 요청 설정 중 오류가 발생한 경우
        throw new Error(`찜한 코스 조회 실패: ${axiosError.message}`);
      }
    } else {
      // Axios 오류가 아닌 경우
      throw new Error('찜한 코스 조회 중 예기치 않은 오류가 발생했습니다');
    }
  }
};

/** PATCH: 회원 정보 수정 */
export const patchMemberInfoApi = async (
  memberInfo: MypageModifyMemberInfo,
): Promise<string> => {
  try {
    await instance.patch('/members', memberInfo);

    return 'ok';
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        throw new Error(
          `회원 정보 수정 실패: ${axiosError.response.status} - ${JSON.stringify(axiosError.response.data)}`,
        );
      } else if (axiosError.request) {
        throw new Error(
          '회원 정보 수정 실패: 서버로부터 응답을 받지 못했습니다',
        );
      } else {
        throw new Error(`회원 정보 수정 실패: ${axiosError.message}`);
      }
    } else {
      throw new Error('회원 정보 수정 중 예기치 않은 오류가 발생했습니다');
    }
  }
};

/** POST: 회원 닉네임 중복 체크 */
export const postDuplicateNameApi = async (
  nickname: string,
): Promise<string> => {
  try {
    await instance.post('/members/check-for-duplicate/nickname', {
      nickname: nickname,
    });

    return 'ok';
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        throw new Error(
          `닉네임 중복 확인 실패: ${axiosError.response.status} - ${JSON.stringify(axiosError.response.data)}`,
        );
      } else if (axiosError.request) {
        throw new Error(
          '닉네임 중복 확인 실패: 서버로부터 응답을 받지 못했습니다',
        );
      } else {
        throw new Error(`닉네임 중복 확인 실패: ${axiosError.message}`);
      }
    } else {
      throw new Error('닉네임 중복 확인 중 예기치 않은 오류가 발생했습니다');
    }
  }
};
