import React from 'react'
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import axios from "axios";

interface RegistrationType {
    email: string
    password: string
    confirmPassword: string
}

interface RegistrationModalProps {
    isOpen: boolean
    onClose: () => void
    switchToLogin: () => void
    onSubmit: (values: RegistrationType) => Promise<void>
}

const RegistrationSchema = Yup.object({
    email: Yup.string()
        .email('Неверный формат e-mail')
        .required('Обязательное поле'),
    password: Yup.string()
        .min(6, 'Минимум 6 символов')
        .required('Обязательное поле'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Пароли не совпадают')
        .required('Обязательное поле'),
})

export const RegistrationModal: React.FC<RegistrationModalProps> = ({isOpen, onClose, switchToLogin, onSubmit}) => {
    if (!isOpen) return null

    return (
        <>
            <header className="modal-header">
                <h2 className="modal-title">Регистрация</h2>
                <button
                    className="modal-close"
                    onClick={onClose}
                    aria-label="Закрыть"
                >
                    <img src="src/assets/close.svg" alt="close" className="img-fluid"/>
                </button>
            </header>

            <Formik
                initialValues={{email: '', password: '', confirmPassword: ''}}
                validationSchema={RegistrationSchema}
                onSubmit={async (
                    values: RegistrationType,
                    { setSubmitting, setErrors, setStatus }: FormikHelpers<RegistrationType>
                ) => {
                    setStatus(undefined);
                    try {
                        await onSubmit(values);
                        onClose();
                    } catch (err: unknown) {
                        if (axios.isAxiosError(err) && err.response) {
                            const msg = err.response.data?.message || 'Email уже зарегистрирован';
                            setErrors({ email: msg });
                        } else {
                            setStatus('Неизвестная ошибка. Попробуйте позже.');
                        }
                    } finally {
                        setSubmitting(false);
                    }
                }}

            >
                {({isSubmitting}) => (
                    <Form className="login-form">
                        <div className="form-group">
                            <Field
                                type="email"
                                name="email"
                                placeholder="E-mail"
                                className="form-input"
                            />
                            <ErrorMessage
                                name="email"
                                component="div"
                                className="form-error"
                            />
                        </div>

                        <div className="form-group">
                            <Field
                                type="password"
                                name="password"
                                placeholder="Пароль"
                                className="form-input"
                            />
                            <ErrorMessage
                                name="password"
                                component="div"
                                className="form-error"
                            />
                        </div>

                        <div className="form-group">
                            <Field
                                type="password"
                                name="confirmPassword"
                                placeholder="Подтвердите пароль"
                                className="form-input"
                            />
                            <ErrorMessage
                                name="confirmPassword"
                                component="div"
                                className="form-error"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="btn btn-primary"
                        >
                            {isSubmitting ? 'Загрузка...' : 'Зарегистрироваться'}
                        </button>
                    </Form>
                )}
            </Formik>

            <div className="form-footer">
                <button
                    type="button"
                    className="link-button"
                    onClick={switchToLogin}
                >
                    Уже есть аккаунт? Войти
                </button>
            </div>

            <button type="button" className="btn btn-secondary">
                Вход для партнёров
            </button>
        </>
    )
}
