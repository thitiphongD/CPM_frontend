export interface LoginType {
    username: string;
    password: string;
}

export interface RegisterType {
    username: string;
    password: string;
    confirmPassword: string;
}

export interface AuthLogin {
    username: string;
    isLogin: boolean;
}