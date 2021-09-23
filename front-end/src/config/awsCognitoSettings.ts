const awsConfiguration = {
  Auth: {
    identityPoolId: process.env.REACT_APP_AUTH_IDENTITY_POOL_ID,
    region: process.env.REACT_APP_AUTH_COGNITO_REGION,
    identityPoolRegion: process.env.REACT_APP_AUTH_IDENTITY_POOL_REGION,
    userPoolId: process.env.REACT_APP_AUTH_USER_POOL_ID,
    userPoolWebClientId: process.env.REACT_APP_AUTH_USER_POOL_WEB_CLIENT_ID,
    oauth: {
      domain: process.env.REACT_APP_AUTH_OAUTH_DOMAIN,
      scope: ['openid'],
      redirectSignIn: 'http://localhost:3000',
      redirectSignOut: '',
      responseType: 'code',
    },
  },
  Storage: {
    AWSS3: {
      region: process.env.REACT_APP_AUTH_COGNITO_REGION,
    },
  },
  API: {
    endpoints: [
      {
        name: 'execute-api',
        endpoint: process.env.REACT_APP_API_ENDPOINT,
        region: process.env.REACT_APP_API_ENDPOINT_REGION,
      },
    ],
  },
};

export default awsConfiguration;
