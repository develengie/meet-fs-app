import { NavLink } from 'react-router-dom'
import { internalPaths } from '@/locales'
import './style.scss'

const Navigation = () => {
  return (
    <nav className="nav">
      <ul className="nav__list">
        <li className="nav__item">
          <NavLink className="link" to={internalPaths.main}>
            Главная
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation
