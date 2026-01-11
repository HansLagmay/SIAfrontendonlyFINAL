import { useState } from 'react';

export interface ApiCallState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export const useApiCall = <T,>(apiFunction: (...args: any[]) => Promise<any>) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = async (...args: any[]): Promise<T | undefined> => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await apiFunction(...args);
      const responseData = result.data as T;
      setData(responseData);
      return responseData;
    } catch (err: any) {
      let errorMessage = 'An unexpected error occurred';
      
      if (err.response) {
        // Handle specific HTTP status codes
        switch (err.response.status) {
          case 401:
            errorMessage = 'Session expired. Please login again.';
            // Clear session and redirect to login handled by axios interceptor
            break;
          case 403:
            errorMessage = err.response.data?.error || 'Permission denied';
            break;
          case 404:
            errorMessage = err.response.data?.error || 'Resource not found';
            break;
          case 409:
            errorMessage = err.response.data?.error || 'Conflict occurred';
            break;
          case 429:
            errorMessage = err.response.data?.error || 'Too many requests. Please slow down.';
            break;
          case 500:
            errorMessage = 'Server error. Please try again later.';
            break;
          default:
            errorMessage = err.response.data?.error || errorMessage;
        }
      } else if (err.request) {
        errorMessage = 'Network error. Please check your connection.';
      } else {
        errorMessage = err.message || errorMessage;
      }
      
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setData(null);
    setError(null);
    setLoading(false);
  };

  return { data, loading, error, execute, reset };
};
