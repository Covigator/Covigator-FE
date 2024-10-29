import { RecommendResponse } from '../types/recommendation';

import axios from 'axios';

const AI_SERVER_URL = import.meta.env.VITE_AI_SERVER_URL;

export const fetchRecommendations = async (requestData: any) => {
  try {
    const response = await axios.post<RecommendResponse[]>(
      `${AI_SERVER_URL}/recommend`,
      requestData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    throw error;
  }
};
