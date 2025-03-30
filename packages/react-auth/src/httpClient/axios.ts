import axios, {
  AxiosInstance,
  HttpStatusCode,
  InternalAxiosRequestConfig,
} from 'axios';

declare module 'axios' {
  interface InternalAxiosRequestConfig {
    _isRetry?: boolean;
  }
}

export interface CreateAxiosClientOptions {
  refreshRoute: string;
}

/**
 * Create Axios instance with already configured refresh logic
 * @param options - options to configure axios client
 * @param config - axios config to configure axios instance
 */
export const createAxiosClient = (
  options: CreateAxiosClientOptions,
  config: InternalAxiosRequestConfig
): AxiosInstance => {
  const client = axios.create(config);

  client.interceptors.response.use(
    (config) => config,
    async (error) => {
      if (
        error.response &&
        error.response.status === HttpStatusCode.Unauthorized
      ) {
        const originalRequest: InternalAxiosRequestConfig | undefined =
          error.config;

        if (originalRequest && !originalRequest._isRetry) {
          originalRequest._isRetry = true;

          try {
            const resp = await axios.post(options.refreshRoute, undefined, {
              withCredentials: true,
            });

            if (resp) {
              return client.request(originalRequest);
            }
          } catch {
            //   TODO: Implement
          }
        }
      }

      return Promise.reject(error);
    }
  );

  return client;
};
