import { db } from '../../../../config/firebase'; // Assuming you have set up Firebase properly
import { User } from '../models/UserModel';
import { BadRequestError, NotFoundError } from '../errors/errors';

// Function to get all users
export const getAllUsers = async (): Promise<User[]> => {
  try {
    const usersSnapshot = await db.collection('users').get();
    const users: User[] = [];
    usersSnapshot.forEach((doc) => {
      users.push({ id: doc.id, ...doc.data() } as User);
    });
    return users;
  } catch (error) {
    throw new Error('Error retrieving users');
  }
};

// Function to create a new user
export const createUser = async (username: string): Promise<User> => {
  try {
    if (!username) throw new BadRequestError('Username is required');
    
    const newUserRef = await db.collection('users').add({ username });
    const newUser = { id: newUserRef.id, username };
    return newUser;
  } catch (error) {
    throw new Error('Error creating user');
  }
};

// Function to get a user by ID
export const getUserById = async (userId: string): Promise<User> => {
  try {
    const userDoc = await db.collection('users').doc(userId).get();
    
    if (!userDoc.exists) {
      throw new NotFoundError('User not found');
    }
    
    return { id: userDoc.id, ...userDoc.data() } as User;
  } catch (error) {
    throw new Error('Error retrieving user');
  }
};
