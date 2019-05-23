import { Auth } from 'aws-amplify';
import axios from 'axios'

export default {
  updateAccount(cb, account, accessToken) {
    let uri    = 'https://dev.tryspiel.com/api/v1/user'
    let config =  {
      headers: {
        'Authorization': accessToken,
      }
    }
    axios.post(uri, account, config)
      .then((response) => {
        if (response.data.data) {
         cb()
        }
      })
      .catch((error) => {
        console.log(error)
      });
  },
  updateCategories(cb, categories, accessToken) {
    let uri    = 'https://dev.tryspiel.com/api/v1/userCategories'
    let config =  {
      headers: {
        'Authorization': accessToken,
      }
    }
    axios.post(uri, categories, config)
         .then((response) => {
           if (response.data.data) {
             cb()
           }
         })
         .catch((error) => {
           console.log(error)
         });
  },
  updateProfilePhoto(cb, photo, accessToken) {
    let uri    = 'https://dev.tryspiel.com/api/v1/userPhoto'
    let config =  {
      headers: {
        'Authorization': accessToken,
        'Content-Type': 'multipart/form-data'
      }
    }
    axios.post(uri, photo, config)
      .then((response) => {
        if (response.data.data) {
         cb()
        }
      })
      .catch((error) => {
        console.log(error)
      });
  },
  getUserByUsername(cb, cbError, username) {
    let uri = `https://dev.tryspiel.com/api/v1/webSearch?username=${username}`
    axios.get(uri)
    .then((response) => {
      cb(response.data.data);
    })
    .catch((error) => {
      if (error.message === "Network Error") {
        cbError(error);
      }
    });
  },
  getAccount(cb, accessToken) {
    let uri = 'https://dev.tryspiel.com/api/v1/account'
    axios.get(uri, {
      headers: {
        'Authorization': accessToken,
      }
    })
    .then((response) => {
      cb(response.data.data.user)
    })
    .catch((error) => {
      console.log(error)
    });
  },
  checkAuth(cb) {
    Auth.currentSession().then(
      session => {
        let accessToken = session.accessToken.jwtToken;
        console.log(session)
        cb(accessToken)
      }).catch((error) => {
        console.log(error.response)
      });
  },
  login(creds, cb, cbError) {
    Auth.signIn(creds.email.toLowerCase(), creds.password).then(
      user => {
        let accessToken = user.signInUserSession.accessToken.jwtToken;
        cb(accessToken);
      }).catch((err) => {
        cbError(err)
        if (err.code === 'UserNotConfirmedException') {
            // The error happens if the user didn't finish the confirmation step when signing up
            // In this case you need to resend the code and confirm the user
            // About how to resend the code and confirm the user, please check the signUp part
        } else if (err.code === 'PasswordResetRequiredException') {
            // The error happens when the password is reset in the Cognito console
            // In this case you need to call forgotPassword to reset the password
            // Please check the Forgot Password part.
        } else if (err.code === 'NotAuthorizedException') {
            // The error happens when the incorrect password is provided
        } else if (err.code === 'UserNotFoundException') {
            // The error happens when the supplied username/email does not exist in the Cognito user pool
        } else {
            console.log(err);
        }
      });
  },

  signOut(cb) {
    Auth.signOut({ global: true })
      .then(
        data => cb(data)
      )
      .catch(
        err => console.log(err)
      );
  },

  signUp(creds, cb) {
    Auth.signUp({
      username: creds.email.toLowerCase(),
      password: creds.password,
      attributes: {
        email: creds.email.toLowerCase()
      }
    })
    .then(data => {
      cb(data)
    })
    .catch(err => console.log(err));
  },

  confirmCode(confirm, cb) {
    Auth.confirmSignUp(confirm.email, confirm.code)
    .then(cb)
    .catch(err => console.log(err));
  }
}
