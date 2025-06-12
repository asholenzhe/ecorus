import React from 'react'
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik'
import * as Yup from 'yup'

interface ConfirmType {
  code: string
}

interface ConfirmModalProps {
  email: string
  isOpen: boolean
  onClose: () => void
  onSubmit: (code: string) => Promise<void>
  onResend: () => void
    switchToEmail: () => void
}

const ConfirmEmailSchema = Yup.object({
  code: Yup.string().required('Введите код'),
})

export const ConfirmModal: React.FC<ConfirmModalProps> = ({email, isOpen, onClose, onSubmit, switchToEmail}) => {
  if (!isOpen) return null

  return (
      <>
        <header className="modal-header">
          <h2 className="modal-title">Подтверждение e-mail</h2>
            <button className="modal-close" onClick={onClose} aria-label="Закрыть">
                <img src="src/assets/close.svg" alt="close" className="img-fluid"/>
            </button>
        </header>

          <p className="subtext">
              Мы отправили код на почту <strong>{email}</strong>. Введите его ниже:
        </p>

        <Formik
            initialValues={{code: ''}}
            validationSchema={ConfirmEmailSchema}
            onSubmit={async (
                values: ConfirmType,
                {setSubmitting}: FormikHelpers<ConfirmType>
            ) => {
              await onSubmit(values.code)
              setSubmitting(false)
            }}
        >
          {({isSubmitting}) => (
              <Form className="login-form">
                <div className="form-group">
                  <Field
                      type="text"
                      name="code"
                      placeholder="Код подтверждения"
                      className="form-input"
                  />
                  <ErrorMessage
                      name="code"
                      component="div"
                      className="form-error"
                  />
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary"
                >
                  {isSubmitting ? 'Проверка...' : 'Отправить'}
                </button>
              </Form>
          )}
        </Formik>

        <div className="form-footer">
          <button
              type="button"
              className="link-button"
              onClick={switchToEmail}
          >
            Не получил(-а) код? Отправить заново
          </button>
        </div>
      </>
  )
}
