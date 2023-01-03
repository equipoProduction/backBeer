'use strict'

const request = require('supertest');
const mongoose = require('mongoose');
const { app, server } = require('../app');
const { config } = require('../config/config.js');


let uri = config.uri;

describe(`\n ** TEST CRUD CLIENT **`, () => {
  beforeAll(async () => {
    await mongoose.connect(uri);
    server.close()
  });

  afterAll(async () => {
    await mongoose.disconnect(uri);
    
  });

  describe('\n ✔ CHECK SERVER EXPREES', function(){
    test('Should wrap with an HTTP server                   ◾ Debería ejecutar el servidor HTTP', function(done){  
      let server = app.listen(9999, function(){
        server.close();
        done();
      });
    })
  })


  describe('\n ✔ GET / CLIENT', () => {
    test('Should respond with a 200 status code             ◾ Debe responder con un código de estado 200', async () => {
      const response = await request(app).get('/api/get_clients').send();
      expect(response.statusCode).toBe(200);
    });

    test('Should respond an array                           ◾ Debe responder una matriz', async () => {
      const response = await request(app).get('/api/get_clients').send();
      expect(response.body).toBeInstanceOf(Array);
    });
  });

 

  describe('\n ✔ POST/ CLIENT', () => {
    describe('Given a new client                              Enviado un nuevo cliente', () => {
      const newClient =   {
        "user_id": "String",
        "name2": "String",
        "surname": "String",
        "role": "String",
        "date_birth": "String",
        "dni": "String",
        "status": true,
        "tel": 612365214,
        "residence" : {
          "address": "String",
          "city": "String",
          "CP": "String",
        },
        data_bill: {
          "cif": "String",
          "address": "String",
          "city": "String",
          "CP": "String",
        },
        date_send: {
          "address": "String",
          "tel": 612365214,
          "city": "String",
          "CP": "String",
        },
      };

      // Debe responder con un código 201
      test('Should respond with a 201 status code           ◾ Debe responder con un código de estado 201', async () => {
        const response = await request(app)
          .post('/api/add_client')
          .send(newClient);
        expect(response.statusCode).toBe(201);
      });

      // Debe responder a un JSON como tipo de contenido
      test('Should have a Content-Type: application/json    ◾ Debe responder a un JSON como tipo en el header', async () => {
        const response = await request(app)
          .post('/api/add_client')
          .send(newClient);
        expect(response.headers['content-type']).toEqual(
          expect.stringContaining('json')
        );
      });

      // Debeia responder con un objeto JSON que contiene la nuevo Producto con una identificación
      test("Should respond with an client ID               ◾ Debe responder con un ID de cliente", async () => {
        const response = await request(app).post("/api/add_client").send(newClient);
        expect(response.body.id);
      });
  //   });
  });
  describe('\n ✔ DELETE / CLIENT', () => {
    test('Should respond with a 404 status code           ◾ Debe responder con un código de estado 404', async () => {
      const response = await request(app).get('/api/delete_client/63af1fd25881098066587336').send();
      expect(response.statusCode).toBe(404);
    });

    test('Should respond an Object                        ◾ Debe responder una Objeto', async () => {
      const response = await request(app).get('/api/delete_client').send();
      expect(response.body).toBeInstanceOf(Object);
    });
  });

  });
});
