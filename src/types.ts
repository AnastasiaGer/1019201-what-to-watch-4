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
  preview: string; //
  movieDurationTime: number; //
  backgroundColor: string;
  isFavorite: boolean;
  videoUrl: string; //
}

export interface UserType {
  id: number;
  email: string;
  name: string;
  avatarURL: string;
}

export interface CommentType {
  id: number;
  user: {
    id: number,
    name: string,
  };
  rating: number;
  comment: string;
  date: string;
}
