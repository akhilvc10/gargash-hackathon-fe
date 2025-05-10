'use server';

import { API_ENDPOINTS } from "@/types/api";

/**
 * Response type from the accident analysis API
 */
export type AnalysisResponse = {
  success: boolean;
  accident_type?: string;
  damage?: string;
  severity?: string;
  recommended_garages?: Array<{
    name: string;
    location: string;
    justification: string;
  }>;
  error?: string;
};

/**
 * Server action to analyze an accident image
 */
export async function analyzeAccidentImage(formData: FormData): Promise<AnalysisResponse> {
  try {
    // Extract the image file from the FormData
    const imageFile = formData.get('image') as File;
    if (!imageFile) {
      return { success: false, error: "No image provided" };
    }

    // Create a new FormData instance to send to the API
    const apiFormData = new FormData();
    apiFormData.append('file', imageFile);

    // Call the external API
    const response = await fetch(API_ENDPOINTS.ANALYZE_ACCIDENT_IMAGE, {
      method: 'POST',
      body: apiFormData,
    });

    console.log("response", response);
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
      accident_type: data.accident_type,
      damage: data.damage,
      severity: data.severity,
      recommended_garages: data.recommended_garages || [],
    };
  } catch (error) {
    console.error("Error in analyzeAccidentImage:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Unknown error occurred" 
    };
  }
}

/**
 * Server action to analyze an accident query
 */
export async function analyzeAccidentQuery(formData: FormData): Promise<AnalysisResponse> {
  try {
    // Extract the query from the FormData
    const query = formData.get('query') as string;
    console.log("analyzeAccidentQuery query", query);
    if (!query) {
      return { success: false, error: "No query provided" };
    }

    // Create URLSearchParams for form URL-encoded data
    const params = new URLSearchParams();
    params.append('query', query);

    // Call the external API with form URL-encoded content
    const response = await fetch(API_ENDPOINTS.ANALYZE_ACCIDENT_QUERY, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params,
    });

    console.log("analyzeAccidentQuery response", response);

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
      accident_type: data.accident_type,
      damage: data.damage,
      severity: data.severity,
      recommended_garages: data.recommended_garages || [],
    };
  } catch (error) {
    console.error("Error in analyzeAccidentQuery:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Unknown error occurred" 
    };
  }
} 