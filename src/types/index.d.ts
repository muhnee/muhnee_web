export type Nullable<T> = T | null;

type FirebaseConfig = {
  apiKey: string;
  authDomain: string;
  databaseURL: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
};

export interface QueueItemResponse {
  id?: string;
  timestamp: string;
  transaction?: Transaction;
}

export type FunctionsResponse<T> = {
  data: T;
};
