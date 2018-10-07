import * as React from 'react'
import styled from 'styled-components'
import { Mutation, ApolloConsumer } from 'react-apollo'
import { NavLink } from 'react-router-dom'
import { Logo } from 'components'
import * as routes from '../../constants/routes'
import history from '../../constants/history'
import { SIGN_OUT } from '../../mutations/user'

const NavItem = styled(NavLink)`
  font-family: var(--main-font);
  font-weight: bold;
  color: var(--white);
`

const Header = ({ me }: any) => (
  <nav className="navbar has-shadow is-fixed-top">
    <div className="navbar-brand">
      <a href={routes.STORIES} className="navbar-item">
        <Logo />
      </a>
      <div role="button" className="navbar-burger" aria-label="menu">
        <span aria-hidden="true" className="has-text-white" />
        <span aria-hidden="true" className="has-text-white" />
        <span aria-hidden="true" className="has-text-white" />
      </div>
    </div>
    <div className="navbar-menu">
      <div className="navbar-end">
        {me ? (
          <Mutation mutation={SIGN_OUT}>
            {signOut => (
              <>
                <div className="navbar-item">
                  <NavItem to={routes.CREATE_STORY}>Create story</NavItem>
                </div>
                <div className="navbar-item">
                  <NavItem to={routes.ACCOUNT}>Profile</NavItem>
                </div>
                <div className="navbar-item">
                  <ApolloConsumer>
                    {client => (
                      <NavItem
                        to="#"
                        onClick={e => {
                          e.preventDefault()
                          signOut()
                          client.resetStore()
                          history.push(routes.SIGN_IN)
                        }}
                      >
                        Sign out
                      </NavItem>
                    )}
                  </ApolloConsumer>
                </div>
              </>
            )}
          </Mutation>
        ) : (
          <>
            <div className="navbar-item">
              <NavItem to={routes.SIGN_UP}>Sign up</NavItem>
            </div>
            <div className="navbar-item">
              <NavItem to={routes.SIGN_IN}>Sign in</NavItem>
            </div>
          </>
        )}
      </div>
    </div>
  </nav>
)

export default Header
