import * as React from 'react'
import { withRouter, Link } from 'react-router-dom'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'
import {
  GridContainer,
  GridRow,
  GridColumn,
  Logo,
  Input,
  Button,
  ErrorMessage,
} from 'components'
import * as routes from '../../constants/routes'

const SIGN_IN = gql`
  mutation($login: String!, $password: String!) {
    signIn(login: $login, password: $password) {
      token
    }
  }
`

const AuthContainer = styled.div`
  background-color: var(--white);
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.45) 0px 2px 10px;
  padding: 36px;
`

const Form = styled.form`
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const INITIAL_STATE = {
  login: '',
  password: '',
}

class SignIn extends React.PureComponent<any, any> {
  public state = { ...INITIAL_STATE }

  public onChange = (event: any) => {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  public onSubmit = (event: any, signIn: any) => {
    signIn().then(async ({ data }: any) => {
      this.setState({ ...INITIAL_STATE })
      localStorage.setItem('token', data.signIn.token)
      await this.props.refetch()
      this.props.history.push(routes.STORIES)
    })
    event.preventDefault()
  }

  public render() {
    const { login, password } = this.state
    const isInvalid = password === '' || login === ''
    return (
      <Mutation mutation={SIGN_IN} variables={{ login, password }}>
        {signIn => (
          <GridContainer>
            <GridRow center>
              <GridColumn lg={4} md={3} sm={2} xs={1} />
              <GridColumn lg={4} md={6} sm={8} xs={10}>
                <AuthContainer>
                  <Logo full={false} />
                  <Form onSubmit={event => this.onSubmit(event, signIn)}>
                    <Input
                      type="text"
                      id="Login"
                      label="Login"
                      name="login"
                      value={login}
                      onChange={this.onChange}
                    />
                    <Input
                      type="password"
                      id="Password"
                      label="Password"
                      name="password"
                      value={password}
                      onChange={this.onChange}
                    />
                    <Button type="submit" title="LOGIN" />
                  </Form>
                </AuthContainer>
              </GridColumn>
              <GridColumn lg={4} md={3} sm={2} xs={1} />
            </GridRow>
          </GridContainer>
        )}
      </Mutation>
    )
  }
}

export default withRouter(SignIn)
