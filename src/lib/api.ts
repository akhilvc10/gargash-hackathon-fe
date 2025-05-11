import type { CarQuery } from "@/types/api";
import { API_ENDPOINTS } from "@/types/api";

/**
 * Fetches car information from the chatbot API
 */
export async function fetchCarInfo(query: string, modelName: string) {
  const payload: CarQuery = {
    query,
    model_name: modelName
  };

  try {
    const response = await fetch(API_ENDPOINTS.CAR_INFO, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch car info: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching car info:", error);
    throw error;
  }
} 