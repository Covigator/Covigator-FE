import { useQuery } from 'react-query';

import { getAllCourseApi, getCourseDetailApi } from '../../api/community';

export const useAllCourses = () => {
  const { data, isLoading, error, refetch } = useQuery({
    /* TODO: queryKey에 사용자 정보 수정 추가 */
    queryKey: ['ALL_COURSES'],
    queryFn: () => getAllCourseApi(),
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
