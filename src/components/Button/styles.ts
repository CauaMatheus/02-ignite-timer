import styled from 'styled-components'
import { ButtonVariant } from '.'

interface IButtonContainerProps {
  variant: ButtonVariant
}

export const ButtonContainer = styled.button<IButtonContainerProps>`
  width: 150px;
  height: 50px;

  background: ${(props) => props.theme['green-500']};
  color: ${(props) => props.theme.white};
`
