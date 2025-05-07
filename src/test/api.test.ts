import { describe, it, expect } from 'vitest';
import { fetchUsers, fetchUserById } from '../api';

describe('API Tests', () => {
  it('fetchUsers should return a list of users', async () => {
    const users = await fetchUsers();
    expect(users).toBeInstanceOf(Array);
    expect(users.length).toBeGreaterThan(0);
    users.forEach(user => {
      expect(user).toHaveProperty('id');
      expect(user).toHaveProperty('name');
      expect(user).toHaveProperty('email');
    });
  });

  it('fetchUserById should return a user for a valid ID', async () => {
    const userId = 1;
    const user = await fetchUserById(userId);
    expect(user).not.toBeNull();
    if (user) {
      expect(user.id).toBe(userId);
      expect(user).toHaveProperty('name');
      expect(user).toHaveProperty('email');
    }
  });

  it('fetchUserById should return null for an invalid ID', async () => {
    const invalidUserId = 9999;
    const user = await fetchUserById(invalidUserId);
    expect(user).toBeNull();
  });
});