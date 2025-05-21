import { FC, useEffect } from 'react';
import { Outlet } from 'react-router';

import { MinimalAuthStoreData } from '../stores';

interface AuthTabSyncWithBroadcastChanelProps {
  authStore: MinimalAuthStoreData;
}

/**
 * Sync auth state between tabs. If we get a logout message,
 * clear auth store in all tabs.
 */
export const AuthTabSyncWithBroadcastChanel: FC<
  AuthTabSyncWithBroadcastChanelProps
> = (props) => {
  useEffect(() => {
    const bcHandler = (event: MessageEvent): void => {
      switch (event.data) {
        // TODO: Move to broadcast chanel lib
        case 'login':
          props.authStore.setIsAuth(true);
          break;
        // TODO: Move to broadcast chanel lib
        case 'logout':
        default:
          props.authStore.clear();
      }
    };

    // TODO: set name dynamically and move to broadcast chanel lib
    const bc = new BroadcastChannel('auth');
    bc.onmessage = bcHandler;

    return () => {
      bc.close();
    };
  }, [props.authStore]);

  return <Outlet />;
};
