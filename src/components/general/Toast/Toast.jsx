import './Toast.css'

import { useToast } from '../../../hooks/context/useToastContext'

function Toast({ id, message, type }) {
    const { removeToast } = useToast()

    return (
        <div className={`toast toast--${type}`} onClick={() => removeToast(id)}>
            <p className="toast__message">{message}</p>
        </div>
    )
}

function ToastContainer() {
    const { toasts } = useToast()

    if (toasts.length === 0) return null

    return (
        <div className="toast-container">
            {toasts.map(toast => (
                <Toast key={toast.id} {...toast} />
            ))}
        </div>
    )
}

export default ToastContainer
