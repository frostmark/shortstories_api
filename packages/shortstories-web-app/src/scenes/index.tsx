import * as React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import withSession from 'higher-order-components/with-session'
import Stories from './stories'
import SignUp from './sign-up'
import SignIn from './sign-in'
import CreateStory from './create-story'
import NotFound from './not-found'
import Verify from './verify'
import ForgotPassword from './forgot-password'
import * as routes from '../constants/routes'
import history from '../constants/history'

const App = ({ session, refetch }: any) => (
  <Router history={history}>
    <Switch>
      <Route
        exact
        path={routes.STORIES}
        render={() => <Stories me={session.me} />}
      />
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
      <Route exact path={routes.FORGOT_PASSWORD} component={ForgotPassword} />
      <Route path={routes.CREATE_STORY} component={CreateStory} />
      <Route path={routes.VERIFY} component={Verify} />
      <Route component={NotFound} />
    </Switch>
  </Router>
)

export default withSession(App)
