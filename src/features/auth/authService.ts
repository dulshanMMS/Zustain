import { AuthResponse } from '../../types';

const API_URL = 'https://dummyjson.com';

export const authService = {
  // Login user
  async login(username: string, password: string): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
          expiresInMins: 30,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Login failed');
      }

      const data = await response.json();
      // DummyJSON returns accessToken, map to token
      return {
        ...data,
        token: data.accessToken || data.token,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('An unexpected error occurred during login');
    }
  },

  // Register user (mock implementation since dummyjson doesn't have register)
  async register(userData: {
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }): Promise<AuthResponse> {
    // Simulate registration - in real app, this would call actual API
    // For demo, we'll just create a mock user
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Check if username is already "taken" (simple validation)
        if (userData.username === 'existinguser') {
          reject(new Error('Username already exists'));
          return;
        }

        // Mock successful registration
        const mockUser: AuthResponse = {
          id: Math.floor(Math.random() * 1000),
          username: userData.username,
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          gender: 'N/A',
          image: 'https://robohash.org/' + userData.username,
          token: 'mock_token_' + Date.now(),
        };

        resolve(mockUser);
      }, 1000);
    });
  },

  // Get current user (if needed)
  async getCurrentUser(token: string): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_URL}/auth/me`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to get user data');
      }

      const data = await response.json();
      return {
        ...data,
        token: data.accessToken || data.token,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('An unexpected error occurred');
    }
  },
};
