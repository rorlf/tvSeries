export interface Show {
  id: number;
  name: string;
  type: string | null;
  language: string | null;
  genres: string[] | null;
  status: string | null;
  runtime: number | null;
  averageRuntime: number | null;
  premiered: string | null;
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
  image?: Image;
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

export interface SearchedShow {
  show: Show;
  score: number;
}

export interface Person {
  id: number;
  name: string;
  image: Image | null;
  birthday: string | null;
  gender: null;
}

export interface SearchedPerson {
  person: Person;
  score: number;
}

export interface PersonCastCredits {
  self: boolean;
  voice: boolean;
  _embedded: {
    show: Show;
  };
}

export interface PersonCrewCredits {
  type: string;
  _embedded: {
    show: Show;
  };
}

interface Image {
  medium: string;
  original: string;
}

interface Rating {
  average: number;
}
