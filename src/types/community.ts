export type CourseItemType = {
  courseId: number;
  name: string;
  description: string;
  score: number;
  imageUrl: string;
  // isLike: boolean;
};

export type CourseDetailType = {
  courseId: number;
  courseName: string;
  courseDescription: string;
  dibsCnt: number;
  dibs: boolean;
  places: PlaceType[];
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

export type CourseListResponse = {
  courses: CourseItemType[];
  hasNext: boolean;
};

export type CourseDetailResponse = {
  courseId: number;
  courseName: string;
  courseDescription: string;
  dibsCnt: number;
  dibs: boolean;
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
