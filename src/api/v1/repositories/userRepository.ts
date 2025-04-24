import { User } from '../types/User';

let users: User[] = [];
let nextId = 1;

export const getUsers = () => users;

export const addUser = (userData: Omit<User, 'id'>): User => {
  const newUser: User = { id: nextId++, ...userData };
  users.push(newUser);
  return newUser;
};

export const updateUserById = (id: number, updates: Partial<User>): User | null => {
  const index = users.findIndex(user => user.id === id);
  if (index === -1) return null;
  users[index] = { ...users[index], ...updates };
  return users[index];
};

export const deleteUserById = (id: number): boolean => {
  const originalLength = users.length;
  users = users.filter(user => user.id !== id);
  return users.length < originalLength;
};
