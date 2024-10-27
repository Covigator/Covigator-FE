import { useMutation, useQuery } from 'react-query';

import { postTravelStyleApi } from '../../api/auth';
import {
  getLikeCourseApi,
  getMyCourseApi,
  patchMemberInfoApi,
  postDuplicateNameApi,
} from '../../api/mypage';
import { travleStyleRequest } from '../../types/auth';
import { MypageModifyMemberInfo } from '../../types/mypage';

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

export const useMemberInfo = (memberInfo: MypageModifyMemberInfo) => {
  const { mutate, isLoading, isSuccess } = useMutation({
    mutationKey: ['MEMBER_INFO'],
    mutationFn: () => patchMemberInfoApi(memberInfo),
    onSuccess: () => {},
    onError: () => {},
  });
  return { mutate, isLoading, isSuccess };
};

export const useDuplicateCheck = (nickname: string) => {
  const { mutate, isLoading } = useMutation({
    mutationKey: ['DUPLICATE_CHECK'],
    mutationFn: () => postDuplicateNameApi(nickname),
    onSuccess: () => {},
    onError: () => {},
  });
  return { mutate, isLoading };
};

export const useTravelStyle = (travelStyles: travleStyleRequest) => {
  const { mutate, isLoading, isSuccess } = useMutation({
    mutationKey: ['TRAVEL_STYLE'],
    mutationFn: () => postTravelStyleApi(travelStyles),
    onSuccess: () => {},
    onError: () => {},
  });
  return { mutate, isLoading, isSuccess };
};
