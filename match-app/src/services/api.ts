import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://73t761f5q5.execute-api.ap-south-1.amazonaws.com/default/propseekr-file-processor';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const matchService = {
  uploadFile: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  searchMatches: async (_filters: any, page = 1, pageSize = 20) => {
    // Note: If the api later supports filters, we can pass them as query params. 
    // Currently relying on just pagination support on the generic endpoint.
    return api.get(`/matches?page=${page}&size=${pageSize}`);
  },
};

export default api;
