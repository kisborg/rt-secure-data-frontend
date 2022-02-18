export const getRandomString = (length) => {
  const allChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for ( let i = 0; i < length; i++) {
  result += allChars.charAt(Math.floor(Math.random() * allChars.length));
  }

  return result;
};

