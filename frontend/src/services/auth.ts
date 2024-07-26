/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-useless-catch */
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

interface LoginResponse {
  success: boolean;
  message?: string;
  user?: any; // Replace 'any' with actual user type if available
}

const AuthService = {
  login: async (username: string, password: string): Promise<LoginResponse> => {
    try {
      const response = await axios.post(`${API_URL}/login`, { username, password });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default AuthService;
