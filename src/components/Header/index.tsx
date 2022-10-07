import { HeaderContainer } from './styles'
import { Timer, Scroll } from 'phosphor-react'
import { NavLink } from 'react-router-dom'

import LogoIgnite from '../../assets/LogoIgnite.svg'

export function Header() {
  return (
    <HeaderContainer>
      <img src={LogoIgnite} alt="" />
      <nav>
        <NavLink end to="/" title="Timer">
          <Timer size={24} />
        </NavLink>
        <NavLink end to="/history" title="Histórico">
          <Scroll size={24} />
        </NavLink>
      </nav>
    </HeaderContainer>
  )
}
