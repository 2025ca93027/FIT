import { CONFIG } from '../constants/config';
import { FALLBACK_GOALS, FALLBACK_WORKOUTS } from '../constants/fallbackData';
import { CreateGoalRequest, Goal, LogWorkoutRequest, Workout } from '../types';

const BASE_URL = CONFIG.API_BASE_URL;

async function headers() {
    return {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    };
}

const fetchWithTimeout = async (url: string, options: RequestInit = {}, timeout = 10000) => {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    try {
        const response = await fetch(url, { ...options, signal: controller.signal });
        clearTimeout(id);
        return response;
    } catch (error) {
        clearTimeout(id);
        throw error;
    }
};

export const api = {
    goals: {
        get: async (): Promise<Goal[]> => {
            try {
                const response = await fetchWithTimeout(`${BASE_URL}/goals`, {
                    method: 'GET',
                    headers: await headers(),
                });
                if (!response.ok) {
                    console.warn('API Error, using fallback data:', response.statusText);
                    return FALLBACK_GOALS;
                }
                return await response.json();
            } catch (error) {
                console.warn('Network request failed, using fallback data:', error);
                return FALLBACK_GOALS;
            }
        },
        create: async (data: CreateGoalRequest): Promise<Goal | null> => {
            try {
                const response = await fetch(`${BASE_URL}/goals`, {
                    method: 'POST',
                    headers: await headers(),
                    body: JSON.stringify(data),
                });
                if (!response.ok) {
                    const errorText = await response.text();
                    console.error(`Failed to create goal: ${response.status} ${response.statusText}`, errorText);
                    throw new Error(`Failed to create goal: ${response.statusText} - ${errorText}`);
                }
                return await response.json();
            } catch (error) {
                console.error('Error creating goal:', error);
                console.error('Failed to create goal. Please try again.');
                return null;
            }
        },
        update: async (id: string, data: { targetValue: number; unit?: string; name: string; endDate?: string }): Promise<boolean> => {
            try {
                const response = await fetch(`${BASE_URL}/goals/${id}`, {
                    method: 'PUT',
                    headers: await headers(),
                    body: JSON.stringify(data),
                });
                if (!response.ok) {
                    const errorText = await response.text();
                    console.error(`Failed to update goal: ${response.status} ${response.statusText}`, errorText);
                }
                return response.ok;
            } catch (error) {
                console.error('Error updating goal:', error);
                return false;
            }
        },
    },
    workouts: {
        get: async (from: string, to: string): Promise<Workout[]> => {
            try {
                const response = await fetchWithTimeout(`${BASE_URL}/workouts?from=${from}&to=${to}`, {
                    method: 'GET',
                    headers: await headers(),
                });
                if (!response.ok) {
                    console.warn('API Error, using fallback data:', response.statusText);
                    return FALLBACK_WORKOUTS;
                }
                return await response.json();
            } catch (error) {
                console.warn('Network request failed, using fallback data:', error);
                return FALLBACK_WORKOUTS;
            }
        },
        log: async (data: LogWorkoutRequest): Promise<Workout | null> => {
            // Placeholder for POST /workouts
            console.log("Log workout requested (Not fully implemented yet):", data);
            try {
                const response = await fetch(`${BASE_URL}/workouts`, {
                    method: 'POST',
                    headers: await headers(),
                    body: JSON.stringify(data),
                });
                if (!response.ok) {
                    throw new Error(`Failed to log workout: ${response.statusText}`);
                }
                return await response.json();
            } catch (error) {
                console.error('Error logging workout:', error);
                // Not using fallback for creation, usually better to fail
                return null;
            }
        }
    },
};
