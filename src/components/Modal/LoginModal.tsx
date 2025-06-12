import React from 'react'
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import Button from "../Button/Button.tsx";
import './modal.css'

interface LoginType {
    email: string
    password: string
}

interface LoginModalProps {
    isOpen: boolean
    onClose: () => void
    switchToRegister: () => void
    switchToEmail: () => void
    onSubmit: (values: LoginType) => Promise<void>
}

const LoginSchema = Yup.object({
    email: Yup.string()
        .email('Неверный формат e-mail')
        .required('Обязательное поле'),
    password: Yup.string()
        .min(6, 'Минимум 6 символов')
        .required('Обязательное поле'),
})

export const LoginModal: React.FC<LoginModalProps> = ({isOpen, onClose, switchToRegister, switchToEmail, onSubmit}) => {
    if (!isOpen) return null

    return (
        <div className="modal">
                <header className="modal-header">
                    <h2 className="modal-title">Вход</h2>
                    <button className="modal" onClick={onClose} aria-label="Закрыть">
                        <img src="src/assets/close.svg" alt="close" className="img-fluid" />
                    </button>
                </header>

                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={LoginSchema}
                    onSubmit={async (values: LoginType, { setSubmitting, setFieldError }: FormikHelpers<LoginType>) => {
                        try {
                            await onSubmit(values);
                        } catch (err: any) {
                            setFieldError('password', 'Неверный email или пароль');
                        } finally {
                            setSubmitting(false);
                        }
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form className="login-form">
                            <div className="login-form-input">
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
                            </div>

                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="modal">
                                {isSubmitting ? 'Загрузка...' : 'Войти'}
                            </Button>
                        </Form>
                    )}
                </Formik>

                <div className="form-footer">
                    <Button
                        type="button"
                        className="modal"
                        onClick={switchToEmail}
                    >
                        Войти с помощью СМС
                    </Button>
                    <Button
                        type="button"
                        className="modal"
                        onClick={switchToRegister}
                    >
                        Регистрация
                    </Button>
                </div>

                <Button type="button" className="btn-secondary">
                    Вход для партнёров
                </Button>
            </div>
    )
}
