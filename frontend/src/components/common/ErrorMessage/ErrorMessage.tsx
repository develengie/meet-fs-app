import './style.scss'

interface ErrorMessageProps {
  error: string
}

const ErrorMessage = ({ error }: ErrorMessageProps) => {
  return <div className="error">{error}</div>
}

export default ErrorMessage
