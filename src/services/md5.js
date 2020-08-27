import md5 from 'crypto-js/md5';

const hashMail = (email) => md5(email).toString().toLowerCase().trim();

export default hashMail;

// Código retirado do PR da Débora Silveira. https://github.com/deboracosilveira/trivia-game/blob/master/src/services/md5.js
