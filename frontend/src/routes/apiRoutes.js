const apiPath = '/api/v1';

export default {
  singupPath: () => [apiPath, 'signup'].join('/'),
  loginPath: () => [apiPath, 'login'].join('/'),
};
