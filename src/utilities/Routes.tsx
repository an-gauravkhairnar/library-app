import Login from '../pages/Login/Login'
import { Route, Switch } from 'react-router-dom';
import Admin from '../pages/Admin/Admin';

const AppRoutes = (
  <Switch>
    <Route exact path="/login">
      <Login />
    </Route>
    <Route exact path="/admin">
      <Admin />
    </Route>
  </Switch>
);

export default AppRoutes;
