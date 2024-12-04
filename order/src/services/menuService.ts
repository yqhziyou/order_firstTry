// services/menuService.ts
import axios from 'axios';
import { MenuItem, ApiResponse } from '../types';
import config from '../config.json'
const API_URL = `${config.apiUrl}/menu`;

export const fetchMenu = async (): Promise<MenuItem[]> => {
    try {
        const response = await axios.get<ApiResponse<MenuItem[]>>(API_URL);
        if (response.data.success) {
            return response.data.data;
        } else {
            throw new Error(response.data.message || 'Failed to fetch menu');
        }
    } catch (error) {
        console.error('Error fetching menu:', error);
        throw error;
    }
};

export const updateMenu = async (updatedData: MenuItem[]): Promise<void> => {
    try {
        const response = await axios.put<ApiResponse<null>>(API_URL, updatedData);
        if (!response.data.success) {
            throw new Error(response.data.message || 'Failed to update menu');
        }
    } catch (error) {
        console.error('Error updating menu:', error);
        throw error;
    }
};
