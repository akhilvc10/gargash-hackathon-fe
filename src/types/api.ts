/**
 * API Types based on OpenAPI schema
 * Generated from: https://gargash-auto.onrender.com/openapi.json
 */

/**
 * Validation Error schema
 */
export interface ValidationError {
  /** Error location */
  loc: Array<string | number>;
  /** Error message */
  msg: string;
  /** Error type */
  type: string;
}

/**
 * HTTP Validation Error response
 */
export interface HTTPValidationError {
  /** List of validation errors */
  detail?: ValidationError[];
}

/**
 * Car Query request for the chatbot endpoint
 */
export interface CarQuery {
  /** The query text */
  query: string;
  /** The model name to query about */
  model_name: string;
}

/**
 * Customer input for car recommendation
 */
export interface CustomerInput {
  /** Customer's price point */
  price: number;
  /** Preferred engine type */
  engine_type: string;
  /** Preferred body style */
  body_style: string;
  /** Required seating capacity */
  seating: number;
  /** Desired features */
  features: string[];
}

/**
 * File upload format for accident analysis
 */
export interface AccidentAnalysisRequest {
  /** The image file to analyze */
  file: File;
}

/**
 * API endpoints configuration
 */
export const API_ENDPOINTS = {
  /** Analyze accident images to detect damage */
  ANALYZE_ACCIDENT: 'https://gargash-auto.onrender.com/analyze-accident/',
  /** Get car information through the chatbot */
  CAR_INFO: 'https://gargash-auto.onrender.com/chatbot/car-info',
  /** Get car recommendations based on preferences */
  RECOMMEND: 'https://gargash-auto.onrender.com/recommend',
} as const; 