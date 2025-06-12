import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';

import { LoginModal } from './LoginModal';
import { RegistrationModal } from './RegistrationModal';
import { ConfirmModal } from './ConfirmModal';

import { login, registration, confirmEmail } from '../../api/auth';
import { setCredentials } from '../../features/userSlice';
import { LanguageEnum } from '../../types/models/LanguageEnum';
import {EmailModal} from "./EmailModal.tsx";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialMode?: 'login' | 'register' | 'email' | 'confirm';
}

export const Modal: React.FC<ModalProps> = ({isOpen, onClose, initialMode = 'login'}: ModalProps) => {
    const [mode, setMode] = useState<'login' | 'register' | 'email' | 'confirm'>(initialMode);
    const [emailForConfirm, setEmailForConfirm] = useState<string>('');
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const onEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) {
            window.addEventListener('keydown', onEsc);
            setMode(initialMode);
        }
        return () => window.removeEventListener('keydown', onEsc);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const handleLogin = async (values: { email: string; password: string }) => {
        const res = await login({ email: values.email, password: values.password });

        dispatch(setCredentials({
            token: res.accessToken,
            balance: res.balance,
            name: res.email,
        }));

        localStorage.setItem('token', res.accessToken);

        onClose();
    };

    const handleRegister = async (values: {
        email: string;
        password: string;
        confirmPassword: string;
    }) => {
        const res = await registration({
            email: values.email,
            password: values.password,
            language: LanguageEnum.RU,
        });

        dispatch(
            setCredentials({
                token: res.accessToken,
                balance: res.balance,
                name: res.email,
            })
        );
        localStorage.setItem('token', res.accessToken);

        setEmailForConfirm(values.email);
        setMode('confirm');
    };

    const handleConfirm = async (code: string) => {
        await confirmEmail({ email: emailForConfirm, code });
        onClose();
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-container" role="dialog" aria-modal="true"  onClick={e => e.stopPropagation()}>
                {mode === 'login' && (
                    <LoginModal
                        isOpen={isOpen}
                        onClose={onClose}
                        switchToRegister={() => setMode('register')}
                        switchToEmail={() => setMode('email')}
                        onSubmit={handleLogin}
                    />
                )}
                {mode === 'register' && (
                    <RegistrationModal
                        isOpen={isOpen}
                        onClose={onClose}
                        switchToLogin={() => setMode('login')}
                        onSubmit={handleRegister}
                    />
                )}
                {mode === 'email' && (
                    <EmailModal
                        isOpen={isOpen}
                        onClose={onClose}
                        switchToConfirm={() => setMode('confirm')}
                        switchToLogin={() => setMode('login')}
                    />
                )}
                {mode === 'confirm' && (
                    <ConfirmModal
                        isOpen={isOpen}
                        email={emailForConfirm}
                        onClose={onClose}
                        onSubmit={handleConfirm}
                        switchToEmail={() => setMode('email')}
                        onResend={() => {}}
                    />
                )}
            </div>
        </div>
    );
};
