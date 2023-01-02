// Lista de origenes premitidos
const whitelist = process.env.WL;
const optionsWL = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Accaeso no permitido 🖐🏼'));
    }
  }
}

module.exports = whitelist;