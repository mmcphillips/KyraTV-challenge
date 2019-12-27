// returns an updated url with the correct value for nextpagetoken
const urlFixer = (url, number, token) => {
  const flag = '&pageToken=';
  const newNum = number + flag.length;
  const split = url.split('');
  split.splice(newNum, token.length, token);
  return split.join('');
};

module.exports = urlFixer;
