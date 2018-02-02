import * as CryptoJS from 'crypto-js';

export function encrypt(data) {
  var key = "72CC4675571A495CBAA7FC4E9AFF449E877FF0A81DF2DF04A24E37DD2E5D9E6F";
  if (data != undefined) {
    return CryptoJS.AES.encrypt(JSON.stringify(data), key).toString();
  } else {
    return undefined;
  }
}

export function decrypt(data) {
  var key = "72CC4675571A495CBAA7FC4E9AFF449E877FF0A81DF2DF04A24E37DD2E5D9E6F";
  if (data != undefined) {
    return JSON.parse(CryptoJS.AES.decrypt(data, key).toString(CryptoJS.enc.Utf8));
  } else {
    return undefined;
  }
}