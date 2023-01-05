// eslint-disable-next-line
import {useState, useEffect} from 'react'
// eslint-disable-next-line
import cookies from 'js-cookie'
import './index.css'

const Login = props => {
  // eslint-disable-next-line

  const [userInput, setUserInput] = useState('')
  const [passwordInput, setPasswordInput] = useState('')
  const [errMsg, setErrMsg] = useState(false)
  const [message, setMessage] = useState('')
  //

  const onSubmitSuccess = jwtToken => {
    const {history} = props
    history.push('/')
    cookies.set('jwt_token', jwtToken, {expires: 30})
  }

  const onSubmitFailure = msg => {
    setErrMsg(true)
    setMessage(msg)
  }

  const onChangeUsername = event => {
    setUserInput(event.target.value)
  }

  const onChangePassword = event => {
    setPasswordInput(event.target.value)
  }

  const onSubmitForm = async event => {
    event.preventDefault()
    const userDetails = {username: userInput, password: passwordInput}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    console.log(response)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      onSubmitSuccess(data.jwt_token)
    } else {
      onSubmitFailure(data.error_msg)
    }
  }

  return (
    <div className="login-container">
      <div className="login">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
          className="login-image"
          alt="website logo"
        />
        <form className="form" onSubmit={onSubmitForm}>
          <label htmlFor="searchInput" className="username-label">
            USERNAME
          </label>{' '}
          <br />
          <input
            type="text"
            className="username-input"
            id="searchInput"
            placeholder="Username"
            value={userInput}
            onChange={onChangeUsername}
          />{' '}
          <br />
          <label htmlFor="passwordInput" className="password-label">
            PASSWORD
          </label>{' '}
          <br />
          <input
            type="password"
            className="password-input"
            id="passwordInput"
            placeholder="Password"
            value={passwordInput}
            onChange={onChangePassword}
          />{' '}
          <br />
          <button className="button" type="submit">
            Login
          </button>
          {errMsg && <p className="error">{message}</p>}
        </form>
      </div>
    </div>
  )
}

export default Login
