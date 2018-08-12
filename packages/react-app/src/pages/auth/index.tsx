import * as React from 'react'
import styled from 'styled-components'
import { GridContainer, GridRow, GridColumn } from 'components/grid'
import Logo from 'components/logo'
import Input from 'components/input'

const AuthContainer = styled.div`
  background-color: var(--white);
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.45) 0px 2px 10px;
  padding: 36px;
`

const Form = styled.form`
  height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

class Auth extends React.PureComponent {
  public render() {
    return (
      <GridContainer>
        <GridRow center>
          <GridColumn lg={4} md={3} sm={2} xs={1} />
          <GridColumn lg={4} md={6} sm={8} xs={10}>
            <AuthContainer>
              <Logo full={false} />
              <Form>
                <Input type="text" id="Login" label="Login" />
                <Input type="password" id="Password" label="Password" />
              </Form>
            </AuthContainer>
          </GridColumn>
          <GridColumn lg={4} md={3} sm={2} xs={1} />
        </GridRow>
      </GridContainer>
    )
  }
}

export default Auth
