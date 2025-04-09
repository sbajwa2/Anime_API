import { db } from '../../../../config/firebase'; // Assuming you have set up Firebase properly
import { Anime } from '../models/AnimeModel';
import { BadRequestError, NotFoundError } from '../errors/errors';

// Function to get all anime
export const getAllAnime = async (): Promise<Anime[]> => {
  try {
    const animeSnapshot = await db.collection('anime').get();
    const animeList: Anime[] = [];
    animeSnapshot.forEach((doc) => {
      animeList.push({ id: doc.id, ...doc.data() } as Anime);
    });
    return animeList;
  } catch (error) {
    throw new Error('Error retrieving anime');
  }
};

// Function to add a new anime
export const createAnime = async (title: string, genre: string): Promise<Anime> => {
  try {
    if (!title || !genre) {
      throw new BadRequestError('Title and genre are required');
    }
    
    const newAnimeRef = await db.collection('anime').add({ title, genre });
    const newAnime = { id: newAnimeRef.id, title, genre };
    return newAnime;
  } catch (error) {
    throw new Error('Error adding anime');
  }
};

// Function to get an anime by ID
export const getAnimeById = async (animeId: string): Promise<Anime> => {
  try {
    const animeDoc = await db.collection('anime').doc(animeId).get();
    
    if (!animeDoc.exists) {
      throw new NotFoundError('Anime not found');
    }
    
    return { id: animeDoc.id, ...animeDoc.data() } as Anime;
  } catch (error) {
    throw new Error('Error retrieving anime');
  }
};

export const updateAnime = async (id: string, data: Partial<Anime>): Promise<Anime | null> => {
    const docRef = db.collection('anime').doc(id);
    await docRef.update(data);
    const updatedDoc = await docRef.get();
    if (!updatedDoc.exists) return null;
    return { id: updatedDoc.id, ...updatedDoc.data() } as Anime;
  };
  
  /**
   * Delete an anime by ID.
   */
  export const deleteAnime = async (id: string): Promise<boolean> => {
    await db.collection('anime').doc(id).delete();
    return true;
  };