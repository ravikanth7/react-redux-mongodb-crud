import * as CryptoJS from 'crypto-js';

export function scrollTo(element, to, duration) {
    if (duration <= 0) return;
    var difference = to - element.scrollTop;
    var perTick = difference / duration * 10;

    setTimeout(function() {
        element.scrollTop = element.scrollTop + perTick;
        if (element.scrollTop === to) return;
        scrollTo(element, to, duration - 10);
    }, 10);
}

export function encrypt(data) {
  var key = "ea5de924175498dde5c4477a53a0f3c71e7bdb47bfd7b3454601b3565be6847fc2cc704cb616c4201f58d1951390ddf7abf3f6c10615eae1f77fbdfb8d9b1aa7";
  if (data != undefined) {
    return CryptoJS.AES.encrypt(JSON.stringify(data), key).toString();
  } else {
    return undefined;
  }
}

export function decrypt(data) {
  var key = "ea5de924175498dde5c4477a53a0f3c71e7bdb47bfd7b3454601b3565be6847fc2cc704cb616c4201f58d1951390ddf7abf3f6c10615eae1f77fbdfb8d9b1aa7";
  if (data != undefined) {
    return JSON.parse(CryptoJS.AES.decrypt(data, key).toString(CryptoJS.enc.Utf8));
  } else {
    return undefined;
  }
}

export function serialize(obj, prefix) {
  const str = [];

  Object.keys(obj).forEach((p) => {
    const k = prefix ? `${prefix}[${p}]` : p;
    const v = obj[p];

    str.push((v !== null && typeof v === 'object') ?
      serialize(v, k) :
      `${encodeURIComponent(k)}=${encodeURIComponent(v)}`);
  });

  return str.join('&');
}

export function buildEndpoint(endpoint, params) {
  let urlParams = '';
  if (params) {
    if (typeof params === 'object') {
      urlParams = `?${serialize(params)}`;
    } else if (typeof params === 'string' || typeof params === 'number') {
      urlParams = `/${params}`;
    }
  }

  return endpoint+urlParams;
}

export function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}