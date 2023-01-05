import cookies from 'js-cookie'
import {Link, withRouter} from 'react-router-dom'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <div className="header-container">
      <div className="logo-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          className="header-logo"
          alt="website logo"
        />
      </div>
      <ul className="header-items">
        <Link to="/">
          {' '}
          <li to="/" className="home-item">
            Home
          </li>
        </Link>
        <Link to="/jobs">
          {' '}
          <li to="/jobs" className="jobs-item">
            Jobs
          </li>
        </Link>
      </ul>
      <div className="logout-container">
        <button type="button" className="logout-button" onClick={onClickLogout}>
          Logout
        </button>
      </div>
    </div>
  )
}

export default withRouter(Header)
