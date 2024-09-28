import { useMutation, useQuery } from 'react-query';

import {
  deleteCourseLikeApi,
  getAllCourseApi,
  getCourseDetailApi,
  getCourseReviewApi,
  postCourseApi,
  postCourseLikeApi,
  postCourseReviewApi,
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

export const usePostCourse = (data: FormData) => {
  const { mutate, isLoading } = useMutation({
    mutationKey: ['COURSE_POST'],
    mutationFn: () => postCourseApi(data),
    onSuccess: () => {},
    onError: () => {},
  });
  return { mutate, isLoading };
};

export const useCourseReviews = (courseId: number) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['COURSE_REVIEWS'],
    queryFn: () => getCourseReviewApi(courseId),
  });
  return { data, isLoading, error, refetch };
};

export const usePostCourseReview = (
  courseId: number,
  requestBody: { score: number; comment: string },
) => {
  const { mutate, isLoading } = useMutation({
    mutationKey: ['COURSE_REVIEW_POST', courseId],
    mutationFn: () => postCourseReviewApi(courseId, requestBody),
    onSuccess: () => {},
    onError: () => {},
  });
  return { mutate, isLoading };
};

export const usePostCourseLike = (courseId: number) => {
  const { mutate, isLoading } = useMutation({
    mutationKey: ['COURSE_LIKE_POST', courseId],
    mutationFn: () => postCourseLikeApi(courseId),
    onSuccess: () => {},
    onError: () => {},
  });
  return { mutate, isLoading };
};

export const useDeleteCourseLike = (courseId: number) => {
  const { mutate, isLoading } = useMutation({
    mutationKey: ['COURSE_LIKE_DELETE', courseId],
    mutationFn: () => deleteCourseLikeApi(courseId),
    onSuccess: () => {},
    onError: () => {},
  });
  return { mutate, isLoading };
};
