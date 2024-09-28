export type CourseItemType = {
  course_id: number;
  name: string;
  description: string;
  score: number;
  image_url: string;
  dibs: boolean;
};

export type PlaceItemType = {
  place_id: number;
  place_name: string;
  place_description: string;
  longitude: string;
  latitude: string;
  // address: string;
  category: string;
  image_url: string;
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
  course_name: string;
  course_description: string;
  places: PlaceItemSnakeType[];
  is_public: string;
};

export type PlaceItemSnakeType = {
  placeId?: number;
  place_name: string;
  address: string;
  category: string;
  description: string;
  latitude: number;
  longitude: number;
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
