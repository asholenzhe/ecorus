import api from './axios';
import {CreateUserDto} from "../types/models/CreateUserDto.ts";
import {AuthUserDto} from "../types/models/AuthUserDto.ts";
import {LoginUserDto} from "../types/models/LoginUserDto.ts";


export const registration = async (
    data: CreateUserDto
): Promise<AuthUserDto> => {
    const response = await api.post<AuthUserDto>('/api/auth/register', data);
    return response.data;
};

export const login = async (
    data: LoginUserDto
): Promise<AuthUserDto> => {
    const response = await api.post<AuthUserDto>('/api/auth/login', data);
    return response.data;
};

export const confirmEmail = async (
    data: { email: string; code: string }
): Promise<void> => {
    await api.post('/api/auth/confirm', data);
};