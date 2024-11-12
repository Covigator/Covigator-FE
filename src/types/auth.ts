export type loginUserResponse = {
  accessToken: string;
  refreshToken: string;
  nickname: string;
  email: string;
  image_url: string;
};

export type signupUserResponse = {
  accessToken: string;
};

export type travelStyleRequest = {
  gender: string;
  area_type: string;
  familiarity: string;
  activity_type: string;
  planning_type: string;
  photo_priority: string;
  popularity: string;
};
