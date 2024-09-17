/* TODO: CourseItemType으로 병합 필요 */
export type CourseType = {
  name: string;
  description: string;
  score: number;
};

export type CourseItemType = {
  id: number;
  title: string;
  caption: string;
  img?: string;
  rate: number;
  isLike: boolean;
};

export type CourseDetailType = {
  id: number;
  title: string;
  desc: string;
  isLike: boolean;
  heartCount: number;
  placeItems: PlaceItemType[];
  reviewItems: ReviewItemType[];
};

/* TODO: PlaceItemType으로 병합 필요 */

export type PlaceType = {
  placeName: string;
  address: string;
  category: string;
  description: string;
};

export type PlaceItemType = {
  id: number;
  type: string;
  name: string;
  desc: string;
  img?: string;
};

export type ReviewItemType = {
  id: number;
  name: string;
  content: string;
  img?: string;
  rate: number;
};

export type AllCourseResponse = {
  courses: CourseType[];
  hasNext: boolean;
};

export type CourseDetailResponse = {
  courseName: string;
  courseDescription: string;
  likeCnt: number;
  isLiked: boolean;
  places: PlaceType[];
};

/* TODO: ReviewItemType으로 병합 필요 */
export type ReviewItem = {
  author: string;
  score: number;
  comment: string;
};

export type ReviewResponse = {
  reviews: ReviewItem[];
  hasNext: boolean;
};
