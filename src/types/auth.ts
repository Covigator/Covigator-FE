export type loginUserResponse = {
  accessToken: string;
  refreshToken: string;
  nickname: string;
  email: string;
  imageUrl: string;
  gender: string;
  generation: string;
  travelStyle: string;
};

export type signupUserResponse = {
  accessToken: string;
};

export type travelStyleRequest = {
  gender: string;
  generation: string;
  area_type: string;
  familiarity: string;
  activity_type: string;
  planning_type: string;
  photo_priority: string;
  popularity: string;
};
