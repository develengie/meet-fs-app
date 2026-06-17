import { Button } from 'antd'
import { useTheme } from '@/context'

type Type = 'button' | 'submit' | 'reset'

interface PrimaryButtonProps {
  type: Type
  text: string
  onClick?: () => void
  isDisabled?: boolean
}

const PrimaryButton = (props: PrimaryButtonProps) => {
  const { type, text, onClick, isDisabled } = props
  const { theme } = useTheme()

  return (
    <Button
      type="primary"
      block
      disabled={isDisabled}
      htmlType={type}
      onClick={onClick}
      style={theme === 'dark' ? { color: 'white' } : {}}
    >
      {text}
    </Button>
  )
}

export default PrimaryButton
