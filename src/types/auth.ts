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
