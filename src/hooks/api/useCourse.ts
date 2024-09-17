import { useQuery } from 'react-query';

import {
  getAllCourseApi,
  getCourseDetailApi,
  getCourseReviewApi,
} from '../../api/community';

export const useAllCourses = (page: number, sort: string) => {
  const { data, isLoading, error, refetch } = useQuery({
    /* TODO: queryKey에 사용자 정보 수정 추가 */
    queryKey: ['ALL_COURSES'],
    queryFn: () => getAllCourseApi(page, sort),
  });
  return { data, isLoading, error, refetch };
};

export const useCourseDetail = (courseId: number) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['COURSE_DETAIL'],
    queryFn: () => getCourseDetailApi(courseId),
  });
  return { data, isLoading, error, refetch };
};

export const useCourseReviews = (courseId: number) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['COURSE_REVIEWS'],
    queryFn: () => getCourseReviewApi(courseId),
  });
  return { data, isLoading, error, refetch };
};
