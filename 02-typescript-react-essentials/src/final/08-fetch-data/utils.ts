import axios from 'axios';
import { tourSchema, type Tour } from './types';
const url = 'https://course-api.com/react-tours-project';

export const fetchTours = async (): Promise<Tour[]> => {
  const response = await axios.get<Tour[]>(url);
  const result = tourSchema.array().safeParse(response.data);
  if (!result.success) {
    throw new Error('Parsing failed');
  }
  return result.data;
};
