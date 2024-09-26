export type CourseItemType = {
  courseId: number;
  name: string;
  description: string;
  score: number;
  imageUrl: string;
  dibs: boolean;
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

export type PlaceItemType = {
  placeId: number;
  placeName: string;
  address: string;
  category: string;
  description: string;
};

export type CourseListResponse = {
  courses: CourseItemType[];
  hasNext: boolean;
};

export type CourseDetailResponse = {
  courseName: string;
  courseDescription: string;
  likeCnt: number;
  isLiked: boolean;
  places: PlaceItemType[];
};

export type CoursePostInfoType = {
  courseName: string;
  courseDescription: string;
  places: PlaceItemType[];
  isPublic: string;
};

export type CoursePostRequest = {
  postCourseRequest: CoursePostInfoType;
  image: File[];
};

export type ReviewItemType = {
  author: string;
  score: number;
  comment: string;
  // img?: string;
};

export type ReviewResponse = {
  reviews: ReviewItemType[];
  hasNext: boolean;
};
