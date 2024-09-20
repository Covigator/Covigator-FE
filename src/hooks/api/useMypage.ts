import { useQuery } from 'react-query';

import { getLikeCourseApi, getMyCourseApi } from '../../api/mypage';

export const useMyCourse = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['MY_COURSE'],
    queryFn: () => getMyCourseApi(),
  });
  return { data, isLoading, error, refetch };
};

export const useLikeCourse = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['LIKE_COURSE'],
    queryFn: () => getLikeCourseApi(),
  });
  return { data, isLoading, error, refetch };
};
