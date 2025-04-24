import { Anime } from '../types/Anime';

let animeList: Anime[] = [];
let nextAnimeId = 1;

export const getAnimeList = () => animeList;

export const addAnime = (animeData: Omit<Anime, 'id'>): Anime => {
  const newAnime: Anime = { id: nextAnimeId++, ...animeData };
  animeList.push(newAnime);
  return newAnime;
};

export const updateAnimeById = (id: number, updates: Partial<Anime>): Anime | null => {
  const index = animeList.findIndex(anime => anime.id === id);
  if (index === -1) return null;
  animeList[index] = { ...animeList[index], ...updates };
  return animeList[index];
};

export const deleteAnimeById = (id: number): boolean => {
  const originalLength = animeList.length;
  animeList = animeList.filter(anime => anime.id !== id);
  return animeList.length < originalLength;
};
