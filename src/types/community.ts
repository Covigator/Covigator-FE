export type CourseItemType = {
  id: number;
  title: string;
  caption: string;
  img?: string;
  rate: number;
  isLike: boolean;
};

export type PlaceItemType = {
  id: number;
  type: string;
  name: string;
  desc: string;
  img?: string;
};
