'use server';

import { API_ENDPOINTS } from "@/types/api";
import type { CustomerInput } from "@/types/api";

/**
 * Response type from the car recommendation API
 */
export interface CarRecommendationResponse {
  success: boolean;
  top_recommendations?: Array<{
    car_model: string;
    probability: number;
    specs: {
      Model: string;
      Year: number;
      Engine: string;
      Transmission: string;
      Performance: string;
      "Drive Type": string;
      Infotainment: string;
      Interior: string;
      Exterior: string;
      Safety: string;
      Tech: string;
    };
  }>;
  error?: string;
}

/**
 * Server action to get car recommendations based on user preferences
 */
export async function getCarRecommendations(preferences: CustomerInput): Promise<CarRecommendationResponse> {
  try {
    console.log("Getting car recommendations for preferences:", preferences);
    
    // Call the external API
    const response = await fetch(API_ENDPOINTS.RECOMMEND, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json'
      },
      body: JSON.stringify(preferences),
    });

    // Handle API errors
    if (!response.ok) {
      const errorText = await response.text();
      console.error("API Error:", errorText);
      return { 
        success: false, 
        error: `API responded with status: ${response.status}` 
      };
    }

    // Parse the response
    const data = await response.json();
    
    return {
      success: true,
      top_recommendations: data.top_recommendations || [],
    };
  } catch (error) {
    console.error("Error in getCarRecommendations:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Unknown error occurred" 
    };
  }
} 