import { makeAutoObservable } from 'mobx';

export interface MinimalAuthStoreClearAction {
  clear: () => void;
}

export interface MinimalAuthStoreData extends MinimalAuthStoreClearAction {
  isAuth: boolean;
  setIsAuth: (status: boolean) => void;
}

export interface MinimalAuthStoreSetTokenPayloadAction {
  setTokenPayload: (token: string | null) => void;
}

export class AuthStoreClass<PayloadModel extends Record<string, unknown>>
  implements MinimalAuthStoreData, MinimalAuthStoreSetTokenPayloadAction
{
  isAuth = false;
  tokenPayload: PayloadModel | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  private parseJwt(token: string): PayloadModel {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map((char) => '%' + ('00' + char.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );

    return JSON.parse(jsonPayload) as PayloadModel;
  }

  setIsAuth = (status: boolean): void => {
    this.isAuth = status;
  };

  setTokenPayload = (token: string | null): void => {
    if (token) {
      this.tokenPayload = this.parseJwt(token);
    } else {
      this.tokenPayload = null;
    }
  };

  clear = (): void => {
    this.setIsAuth(false);
    this.setTokenPayload(null);
  };
}
