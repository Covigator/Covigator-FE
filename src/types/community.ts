export type CourseItemType = {
  courseId: number;
  name: string;
  description: string;
  score: number;
  imageUrl: string;
  dibs: boolean;
};

export type CourseDetailType = {
  courseId: number;
  courseName: string;
  courseDescription: string;
  dibsCnt: number;
  dibs: boolean;
  places: PlaceType[];
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
  courseId: number;
  courseName: string;
  courseDescription: string;
  dibsCnt: number;
  dibs: boolean;
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
