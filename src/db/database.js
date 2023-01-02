const mongoose = require('mongoose');

uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.qmiyj.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;
uri_local = `mongodb:pross//${process.env.USER_LOCAL}:${process.env.PASSWORD_LOCAL}localhost:27017/${process.env.DBNAME}`


// Si prefieres trabar en local cambia a uri_local
mongoose.connect(uri)
  .then(db => console.log("🟢 La conexión MongoDB tuvo éxito."))
  .catch(err => console.log("🔴 Error en la conexión DB: " + err));  

