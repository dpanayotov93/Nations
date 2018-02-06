import { ENV } from './../core/env.config';

interface AuthConfig {
  CLIENT_ID: string;
  CLIENT_DOMAIN: string;
  AUDIENCE: string;
  REDIRECT: string;
  SCOPE: string;
  NAMESPACE: string;
};

export const AUTH_CONFIG: AuthConfig = {
  CLIENT_ID: '2QYH03tCyEWy0hn0RJXjo5HLlmeUZPb1',
  CLIENT_DOMAIN: 'dpanayotov93.auth0.com', // e.g., you.auth0.com
  AUDIENCE: 'http://localhost:3000/', // e.g., http://localhost:3000/api/
  REDIRECT: `${ENV.BASE_URI}/callback`,
  SCOPE: 'openid profile',
  NAMESPACE: 'http://myapp.com/roles'
};