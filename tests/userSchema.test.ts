import Joi from 'joi';
import { userSchema } from '../src/api/v1/schemas/userSchema';

describe('User Schema Validation', () => {
  it('should validate a valid user object', () => {
    const validUser = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      age: 30,
    };

    const { error } = userSchema.validate(validUser);
    expect(error).toBeUndefined();
  });

  it('should return error if name is less than 3 characters', () => {
    const invalidUser = {
      name: 'Jo',
      email: 'john.doe@example.com',
      age: 30,
    };

    const { error } = userSchema.validate(invalidUser);
    if (error) {
      expect(error.details[0].message).toContain('Name must be at least 3 characters long');
    } else {
      throw new Error('Validation error should have occurred');
    }
  });

  it('should return error if name is more than 100 characters', () => {
    const invalidUser = {
      name: 'J'.repeat(101),
      email: 'john.doe@example.com',
      age: 30,
    };

    const { error } = userSchema.validate(invalidUser);
    if (error) {
      expect(error.details[0].message).toContain('Name must be less than 100 characters');
    } else {
      throw new Error('Validation error should have occurred');
    }
  });

  it('should return error if email is invalid', () => {
    const invalidUser = {
      name: 'John Doe',
      email: 'john.doe@',
      age: 30,
    };

    const { error } = userSchema.validate(invalidUser);
    if (error) {
      expect(error.details[0].message).toContain('Email must be a valid email address');
    } else {
      throw new Error('Validation error should have occurred');
    }
  });

  it('should return error if age is less than 18', () => {
    const invalidUser = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      age: 16,
    };

    const { error } = userSchema.validate(invalidUser);
    if (error) {
      expect(error.details[0].message).toContain('Age must be at least 18');
    } else {
      throw new Error('Validation error should have occurred');
    }
  });

  it('should return error if age is greater than 120', () => {
    const invalidUser = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      age: 121,
    };

    const { error } = userSchema.validate(invalidUser);
    if (error) {
      expect(error.details[0].message).toContain('Age must be less than 120');
    } else {
      throw new Error('Validation error should have occurred');
    }
  });
});
