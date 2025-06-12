import React from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';

interface EmailModalProps {
    isOpen: boolean;
    onClose: () => void;
    switchToLogin: () => void;
    switchToConfirm: () => void;
}

const EmailSchema = Yup.object({
    email: Yup.string()
        .email('Неверный формат e-mail')
        .required('Обязательное поле'),
});

export const EmailModal: React.FC<EmailModalProps> = ({isOpen, onClose, switchToLogin, switchToConfirm,}) => {
    if (!isOpen) return null;

    return (
        <div className="modal">
            <header className="modal-header">
                <h2 className="modal-title">Вход по коду</h2>
                <button className="modal-close" onClick={onClose} aria-label="Закрыть">
                    <img src="src/assets/close.svg" alt="close" className="img-fluid" />
                </button>
            </header>

            <p className="subtext">Введите ваш e-mail для получения кода:</p>

            <Formik
                initialValues={{ email: '' }}
                validationSchema={EmailSchema}
                onSubmit={async (
                    _values: { email: string },
                    { setSubmitting, setFieldError }: FormikHelpers<{ email: string }>
                ) => {
                    try {
                        switchToConfirm();
                    } catch (err: any) {
                        const msg =
                            err.response?.data?.message ||
                            'Не удалось отправить код. Попробуйте позже.';
                        setFieldError('email', msg);
                    } finally {
                        setSubmitting(false);
                    }
                }}
            >
                {({ isSubmitting }) => (
                    <Form className="login-form">
                        <div className="form-group">
                            <Field
                                type="email"
                                name="email"
                                placeholder="E-mail"
                                className="form-input"
                            />
                            <ErrorMessage name="email" component="div" className="form-error" />
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="btn btn-primary"
                        >
                            {isSubmitting ? 'Отправляем...' : 'Получить код'}
                        </button>
                    </Form>
                )}
            </Formik>

            <div className="form-footer">
                <button type="button" className="link-button" onClick={switchToLogin}>
                    Я уже зарегистрировался(-ась)
                </button>
            </div>

            <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
            >
                Вход для партнёров
            </button>
        </div>
    );
};
