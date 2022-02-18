import CryptoJS from "crypto-js";

export const getRandomString = (length) => {
  const allChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for ( let i = 0; i < length; i++) {
  result += allChars.charAt(Math.floor(Math.random() * allChars.length));
  }

  return result;
};

export const hmacSignatureIsValid = (signature, message, secret) => {
  const verificationSignature = CryptoJS.HmacSHA1(message, secret).toString(CryptoJS.enc.Hex);
  return verificationSignature === signature;
}

