import * as React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import withSession from './higher-order-components/with-session'
import Main from 'pages/main'
import SignUp from 'pages/sign-up'
import SignIn from 'pages/sign-in'
import Navigation from 'components/navigation'
import CreateStory from 'pages/create-story'
import NotFound from 'pages/not-found'
import * as routes from './constants/routes'
import history from './constants/history'

const App = ({ session, refetch }: any) => (
  <Router history={history}>
    <div>
      <Navigation session={session} />
      <hr />
      <Switch>
        <Route exact path={routes.MAIN} render={() => <Main />} />
        <Route
          exact
          path={routes.SIGN_UP}
          render={() => <SignUp refetch={refetch} />}
        />
        <Route
          exact
          path={routes.SIGN_IN}
          render={() => <SignIn refetch={refetch} />}
        />
        <Route path={routes.CREATE_STORY} component={CreateStory} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
)

export default withSession(App)
