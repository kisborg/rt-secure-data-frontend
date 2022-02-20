import CryptoJS from "crypto-js";

export const getRandomString = (length) => {
  const allChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for ( let i = 0; i < length; i++) {
  result += allChars.charAt(Math.floor(Math.random() * allChars.length));
  }

  return result;
};

export const hmacSignatureIsValid = (message, signature, secret) => {
  const verificationSignature = CryptoJS.HmacSHA1(message, secret).toString(CryptoJS.enc.Hex);
  return verificationSignature === signature;
}

export const encryptAndSignMessage = (message, secretKey) => {
  const encryptedMessage = CryptoJS.AES.encrypt(message, secretKey, { 
    keySize: 256,
    mode: CryptoJS.mode.CFB,
    padding: CryptoJS.pad.NoPadding
  });
  const signature = CryptoJS.HmacSHA1(encryptedMessage.toString(), secretKey).toString(CryptoJS.enc.Hex);

  return { message: encryptedMessage.toString(), signature };
}

export const verifyAndDecryptMessage = (message, signature, secretKey) => {
  if (!hmacSignatureIsValid(message, signature, secretKey)) {
    return 'Unauthorized: Sender could not be verified';
  }

  return CryptoJS.AES.decrypt(message, secretKey, {
      keySize: 256,
      mode: CryptoJS.mode.CFB,
      padding: CryptoJS.pad.NoPadding
    })
    .toString(CryptoJS.enc.Utf8);
}