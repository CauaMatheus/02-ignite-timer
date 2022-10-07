import { ButtonContainer } from './styles'

export type ButtonVariant = 'primary' | 'secondary' | 'success' | 'danger'

interface IButtonProps {
  variant?: ButtonVariant
}

export function Button({ variant = 'primary' }: IButtonProps) {
  return <ButtonContainer variant={variant}>Enviar</ButtonContainer>
}
