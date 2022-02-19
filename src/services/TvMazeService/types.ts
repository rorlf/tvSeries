export interface Show {
  id: number;
  name: string;
  genres: string[];
  rating: {
    average: number;
  };
  image: {
    medium: string;
    original: string;
  };
  sumary: string;
}
