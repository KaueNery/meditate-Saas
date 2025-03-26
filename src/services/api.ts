// src/services/api.ts
import axios from 'axios';
import { MeditationItem, CourseItem } from '../types';

const API_BASE_URL = 'http://192.168.100.228:3000';

export const getSessions = async (): Promise<MeditationItem[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/sessions`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch sessions');
  }
};

export const getCourses = async (): Promise<CourseItem[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/courses`);
    return response.data.map((course: any) => ({
      ...course,
      sessions: course.sessions || []
    }));
  } catch (error) {
    throw new Error('Failed to fetch courses');
  }
};

export const saveUser = async ( email: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users`, {
      email
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to save user');
  }
};
