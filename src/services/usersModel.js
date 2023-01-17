const User = require('../models/userSchema')
const Client = require('../models/clientSchema')

exports.get_users  = async () => {
  return await User.find();
}

exports.delete_user  = async (id) => {
  return await User.findByIdAndDelete(id);
}

exports.add_user  = async (body) => {
  const user = new User(body);
  return await User.create(user); 
}

exports.get_user  = async (id) => {
  return await User.findOne({ _id: id });
}

exports.edit_user = async (id,body) => {
  return await User.findByIdAndUpdate(id, body);
}

exports.new_user = async (body) => {

  // Buscar si el usuario ya está reguistrado 
  const email = body.email
  const query = await User.findOne({ 'email': email });
  if (query) {
    return '✋🏼 Oppss! Usuario ya esta regitrado'
  }
  // Si el usuario no está reguistrado graba usuario
  const data = {
    email: body.email,
    password: body.password,
    role:"client",
    remembertoken:"",
    status: true,
   }
  const user = new User(data);
  const newUser = await user.save()
  // Obtendremos id de usuarario para colocarlo como user_id y guardamos el resto de datos obtenidos

  const client = {
    user_id: newUser._id,
    name: body.name,
    surname: body.surname,
    email: newUser.email,
    tel: body.tel,
    date_birth: body.date_birth,
    status: newUser.status,
    residence: {
      address: body.address,
      city: body.city,
      CP: body.cp,
    }
  }
  const Newclient = new Client(client);
  await Client.create(Newclient);
  const result  = 'El usuario regitrado correctemente, Cheers!🍻 '
  return result
}



