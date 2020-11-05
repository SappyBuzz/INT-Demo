import * as CryptoJS from 'crypto-js';



export default {
    TEMP : {
        KEY: '_tk',
        PASSWORD: '90590348534YYIU!@00'
      },
encription(data, secret) {
    return CryptoJS.AES.encrypt(JSON.stringify(data), secret);
  },
decription(data, secret) {
    const bytes = CryptoJS.AES.decrypt(data.toString(), secret);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  },
  setRegistrationData(DATA) {
    return new Promise((resolve, reject) => {
       localStorage.setItem('REGISTRATION_DATA', this.encription(DATA, this.TEMP.PASSWORD).toString());
       resolve();
    });
  },
  getRegistrationData() {
    const DATA = localStorage.getItem('REGISTRATION_DATA') !== null ? localStorage.getItem('REGISTRATION_DATA') : undefined;
    if (DATA && DATA !== undefined) {
      return this.decription(DATA, this.TEMP.PASSWORD);
    } else {
      return undefined;
    }
  },
  clearRegistrationData() {
    return localStorage.removeItem('REGISTRATION_DATA');
  },

  setLoggedInUserToken(DATA) {
    return new Promise((resolve, reject) => {
       localStorage.setItem('LOGGED_IN_USER_TOKEN', this.encription(DATA, this.TEMP.PASSWORD).toString());
       resolve();
    });
  },
  getLoggedInUserToken() {
    const DATA = localStorage.getItem('LOGGED_IN_USER_TOKEN') !== null ? localStorage.getItem('LOGGED_IN_USER_TOKEN') : undefined;
    if (DATA && DATA !== undefined) {
      return this.decription(DATA, this.TEMP.PASSWORD);
    } else {
      return undefined;
    }
  },
  clearLoggedInUserToken() {
    return localStorage.removeItem('LOGGED_IN_USER_TOKEN');
  }


}