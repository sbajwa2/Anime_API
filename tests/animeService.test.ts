import { getAllAnime, createAnime, getAnimeById, updateAnime, deleteAnime } from '../src/api/v1/services/animeService';
import { db } from '../config/firebase'; // Mock Firebase
import { Anime } from '../src/api/v1/models/AnimeModel';
import { BadRequestError, NotFoundError } from '../src/api/v1/errors/errors';

// Mock Firebase db functions
jest.mock('../config/firebase', () => ({
  db: {
    collection: jest.fn().mockReturnThis(),
    get: jest.fn(),
    add: jest.fn(),
    doc: jest.fn().mockReturnThis(),
    update: jest.fn(),
    delete: jest.fn(),
  },
}));

describe('Anime Service Tests', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test createAnime
  it('should create a new anime', async () => {
    const mockNewAnime = { id: '1', title: 'Naruto', genre: 'Action' };
    (db.collection as jest.Mock).mockReturnValueOnce({
      add: jest.fn().mockResolvedValueOnce({ id: '1' }),
    });

    const createdAnime = await createAnime('Naruto', 'Action');
    expect(createdAnime).toEqual(mockNewAnime);
  });

  it('should throw a BadRequestError if title or genre is missing', async () => {
    await expect(createAnime('', 'Action')).rejects.toThrow(BadRequestError);
    await expect(createAnime('Naruto', '')).rejects.toThrow(BadRequestError);
  });

  it('should throw an error if createAnime fails', async () => {
    (db.collection as jest.Mock).mockReturnValueOnce({
      add: jest.fn().mockRejectedValueOnce(new Error('Database Error')),
    });
    
    await expect(createAnime('Naruto', 'Action')).rejects.toThrow('Error adding anime');
  });

  // Test getAnimeById
  it('should return anime by ID', async () => {
    const mockAnime = { id: '1', title: 'Naruto', genre: 'Action' };
    (db.collection as jest.Mock).mockReturnValueOnce({
      doc: jest.fn().mockReturnThis(),
      get: jest.fn().mockResolvedValueOnce({ exists: true, data: () => mockAnime }),
    });

    const anime = await getAnimeById('1');
    expect(anime).toEqual(mockAnime);
  });

  it('should throw a NotFoundError if anime does not exist', async () => {
    (db.collection as jest.Mock).mockReturnValueOnce({
      doc: jest.fn().mockReturnThis(),
      get: jest.fn().mockResolvedValueOnce({ exists: false }),
    });
    
    await expect(getAnimeById('1')).rejects.toThrow(NotFoundError);
  });

  it('should throw an error if getAnimeById fails', async () => {
    (db.collection as jest.Mock).mockReturnValueOnce({
      doc: jest.fn().mockReturnThis(),
      get: jest.fn().mockRejectedValueOnce(new Error('Database Error')),
    });
    
    await expect(getAnimeById('1')).rejects.toThrow('Error retrieving anime');
  });

  // Test updateAnime
  it('should update an anime by ID', async () => {
    const mockUpdatedAnime = { id: '1', title: 'Naruto Shippuden', genre: 'Action' };
    (db.collection as jest.Mock).mockReturnValueOnce({
      doc: jest.fn().mockReturnThis(),
      update: jest.fn().mockResolvedValueOnce({}),
      get: jest.fn().mockResolvedValueOnce({ exists: true, data: () => mockUpdatedAnime }),
    });

    const updatedAnime = await updateAnime('1', { title: 'Naruto Shippuden' });
    expect(updatedAnime).toEqual(mockUpdatedAnime);
  });

  it('should return null if anime not found when updating', async () => {
    (db.collection as jest.Mock).mockReturnValueOnce({
      doc: jest.fn().mockReturnThis(),
      update: jest.fn().mockResolvedValueOnce({}),
      get: jest.fn().mockResolvedValueOnce({ exists: false }),
    });
    
    const updatedAnime = await updateAnime('1', { title: 'Naruto Shippuden' });
    expect(updatedAnime).toBeNull();
  });

  it('should throw an error if updateAnime fails', async () => {
    (db.collection as jest.Mock).mockReturnValueOnce({
      doc: jest.fn().mockReturnThis(),
      update: jest.fn().mockRejectedValueOnce(new Error('Database Error')),
    });

    await expect(updateAnime('1', { title: 'Naruto Shippuden' })).rejects.toThrow('Error updating anime');
  });

  // Test deleteAnime
  it('should delete an anime by ID', async () => {
    (db.collection as jest.Mock).mockReturnValueOnce({
      doc: jest.fn().mockReturnThis(),
      delete: jest.fn().mockResolvedValueOnce({}),
    });

    const result = await deleteAnime('1');
    expect(result).toBe(true);
  });

  it('should throw an error if deleteAnime fails', async () => {
    (db.collection as jest.Mock).mockReturnValueOnce({
      doc: jest.fn().mockReturnThis(),
      delete: jest.fn().mockRejectedValueOnce(new Error('Database Error')),
    });
    
    await expect(deleteAnime('1')).rejects.toThrow('Error deleting anime');
  });
});
