
import { toast } from 'sonner';

export interface User {
  name?: string;
  email: string;
}

export const isLoggedIn = (): boolean => {
  return localStorage.getItem('user') !== null;
};

export const getCurrentUser = (): User | null => {
  const userStr = localStorage.getItem('user');
  if (!userStr) return null;
  
  try {
    return JSON.parse(userStr);
  } catch (error) {
    console.error('Failed to parse user data:', error);
    return null;
  }
};

export const login = (email: string, password: string): Promise<User> => {
  // Mock login - in a real app, this would call an API
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email && password) {
        const user = { email };
        localStorage.setItem('user', JSON.stringify(user));
        resolve(user);
      } else {
        reject(new Error('Invalid credentials'));
      }
    }, 800);
  });
};

export const signup = (name: string, email: string, password: string): Promise<User> => {
  // Mock signup - in a real app, this would call an API
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (name && email && password) {
        const user = { name, email };
        localStorage.setItem('user', JSON.stringify(user));
        resolve(user);
      } else {
        reject(new Error('Invalid information'));
      }
    }, 800);
  });
};

export const logout = (): void => {
  localStorage.removeItem('user');
  toast.success('Logged out successfully');
};
