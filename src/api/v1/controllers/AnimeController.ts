import { Request, Response } from 'express';
import { Anime } from '../types/Anime';
import { animeSchema } from '../models/AnimeModel';

let animeList: Anime[] = [];
let nextAnimeId = 1;

export const getAllAnime = (req: Request, res: Response) => {
  res.status(200).json({ anime: animeList });
};

export const createAnime = (req: Request, res: Response) => {
    res.status(201).json({ message: 'Anime created successfully' });
};

export const updateAnime = (req: Request, res: Response) => {
    
    res.status(200).json({ message: 'Anime updated successfully'});
  };
  

export const deleteAnime = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  animeList = animeList.filter(anime => anime.id !== id);
  res.status(200).json({ message: 'Anime deleted successfully' });
};
