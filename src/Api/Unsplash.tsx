
import axios from 'axios';

const ACCESS_KEY = '8zZikS8OcZ8VlAbTIxKkIqGYw5PWoIHtMRQPinJdCCc';  


interface Images {
  id: string;
  urls: {
    regular: string;
    small: string;
  };
  alt_description?: string;
}

interface ApiResponse {
  results: Images[];
  total: number;
  total_pages: number;
}

const unsplashApi = axios.create({
  baseURL: 'https://api.unsplash.com/',
  headers: {
    Authorization: `Client-ID ${ACCESS_KEY}`,
  },
});

export const searchImages = async (query:string, page = 1): Promise<ApiResponse> => {
  const response = await unsplashApi.get<ApiResponse>('/search/photos', {
    params: {
      query,
      page,
      per_page: 12,  
    },
  });

  return response.data;
};