export interface User {
    id: string;
    name: string;
    email: string;
}

export interface AuthState {
    user: any;
    isAuthenticated: boolean;
    loading: boolean;
    initialized: boolean;
    error: string | null;
}