import { useQuery } from 'react-query';

import { getAllCourseApi } from '../../api/community';

export const useAllCourses = () => {
  const { data, isLoading, error, refetch } = useQuery({
    /* TODO: queryKey에 사용자 정보 수정 추가 */
    queryKey: ['ALL_COURSES'],
    queryFn: () => getAllCourseApi(),
  });
  return { data, isLoading, error, refetch };
};
