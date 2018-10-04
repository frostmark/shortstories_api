import * as React from 'react'
import styled from 'styled-components'
import 'bulma/css/bulma.css'

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 20%;
  height: 500px;
  margin: auto;
  align-items: center;
  > input {
    margin: 7px;
  }
  > button {
    margin: 7px;
  }
`

class SignIn extends React.PureComponent {
  dataLogin = (event) => {
    // console.log(event.target.value)
  }
  dataPassword = (event) => {
    // console.log(event.target.value)
  }

  render() {
    return (
      <div>
        <Form>
          <input
            className={'input is-rounded'}
            placeholder={'Login'}
            onChange={this.dataLogin}
          />
          <input
            className={'input is-rounded'}
            placeholder={'Password'}
            onChange={this.dataPassword}
          />
          <button className={'button is-primary is-rounded'}>Login</button>
        </Form>
      </div>
    )
  }
}

export default SignIn
