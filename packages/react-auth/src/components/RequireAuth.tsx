import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import { Navigate, Outlet, useLocation, Location } from 'react-router';

import { MinimalAuthStore } from '../stores';

interface RequireAuthProps {
  authStore: MinimalAuthStore;
  signInRoute: string;
}

/**
 * Component, that navigate user to sign in page, if user not auth
 */
export const RequireAuth: FC<RequireAuthProps> = observer((props) => {
  const location = useLocation();

  return props.authStore.isAuth ? (
    <Outlet />
  ) : (
    <Navigate
      to={props.signInRoute}
      state={{
        from: location.pathname,
      }}
    />
  );
});

interface LocationWithFromState extends Location {
  state: { from: string } | null;
}

/**
 * Use Location hook from react-router, extended with from state. Must be used in sign in logic.
 */
export const useLocationWithFromState = (): LocationWithFromState =>
  useLocation();
