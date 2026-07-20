import Navigation from '../Navigation'
import NavigationProfile from '../NavigationProfile'
import './style.scss'

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header__inner">
          <Navigation />
          <NavigationProfile />
        </div>
      </div>
    </header>
  )
}

export default Header
