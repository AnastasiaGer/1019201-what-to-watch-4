export interface MovieType {
  id: number;
  title: string;
  picture: string;
  genre: string;
  date: number;
  poster: string;
  background: string;
  rating: number;
  scores: number;
  director: string;
  starring: string[];
  description: string;
  movieDurationTime: number;
  backgroundColor: string;
  isFavorite: boolean;
  preview: string;
  videoLink: string;
}
export interface UserType {
  id: number;
  email: string;
  name: string;
  avatarURL: string;
}

export interface ReviewType {
  id: number;
  user: {
    id: number,
    name: string,
  };
  rating: number;
  comment: string;
  date: string;
}

export interface PostReview {
  rating: number;
  comment: string;
}
