import auth0 from 'auth0-js'

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: 'webapp1.auth0.com',
    clientID: 'uZxUdMAsiDWeu3OrNpoi4JwJscdF5nAx',
    redirectUri: 'http://localhost:3000/callback',
    responseType: 'token id_token',
    scope: 'openid profile email',
  });

  userProfile = {};

  login = () => this.auth0.authorize();

  handleAuth = (cb) => {
    this.auth0.parseHash((err, authResult) => {
      if(authResult) {
        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);

        const expiresAt = JSON.stringify((authResult.expiresIn * 1000 + new Date().getTime()));
        localStorage.setItem('expiresAt', expiresAt);

        this.getProfile(cb);
      } else {
        console.log(err);
      }
    })
  }

  getProfile = (cb) => {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      this.auth0.client.userInfo(accessToken, (err, profile) => {
          if (profile) {
            this.userProfile = { profile };
            cb();
          }
      });
    }
  };

  isAuthenticated = () => {
    const expiresAt = JSON.parse(localStorage.getItem('expiresAt'));
    return (new Date().getTime() < expiresAt);
  }
}