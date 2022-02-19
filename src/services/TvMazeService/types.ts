export interface Show {
  id: number;
  name: string;
  type: string;
  language: string;
  genres: string[];
  status: string;
  runtime: number | null;
  averageRuntime: number | null;
  premiered: string;
  ended: string | null;
  officialSite: string | null;
  schedule: {
    time: string;
    days: string[];
  } | null;
  rating: Rating | null;
  network: {
    id: number;
    name: string;
    country: {
      name: string;
      code: string;
      timezone: string;
    };
  } | null;
  image: Image;
  summary: string;
}

export interface Season {
  id: number;
  name: string;
  season: number;
  number: number;
  summary: string;
  runtime: number | null;
  image: Image | null;
}

export interface Episode {
  id: number;
  name: string;
  season: number;
  number: number;
  summary: string | null;
  runtime: number | null;
  image: Image | null;
}

interface Image {
  medium: string;
  original: string;
}

interface Rating {
  average: number;
}
