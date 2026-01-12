import { AxiosResponse } from 'axios';

// Generic API function type with proper typing
export interface ApiFunction<TArgs extends any[], TResponse> {
  (...args: TArgs): Promise<AxiosResponse<TResponse>>;
}

// Property update data with proper types
export interface PropertyUpdateData {
  status?: string;
  statusHistory?: StatusHistoryEntry[];
  soldBy?: string;
  soldByAgentId?: string;
  soldAt?: string;
  salePrice?: number;
  reservedBy?: string;
  reservedAt?: string;
  reservedUntil?: string;
}

export interface StatusHistoryEntry {
  status: string;
  changedBy: string;
  changedByName: string;
  changedAt: string;
  reason?: string;
}

// Table row type for generic data tables
export interface TableRow {
  [key: string]: string | number | boolean | object | null | undefined;
}

// Validation types
export interface PropertyValidationData {
  title: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
}

export interface InquiryValidationData {
  phone: string;
  email: string;
  message: string;
}

export interface ValidationErrors {
  [key: string]: string;
}
