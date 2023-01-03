'use strict'

const request = require('supertest');
const mongoose = require('mongoose');
const { app, server } = require('../app');
const { config } = require('../config/config.js');


let uri = config.uri;

describe(`\n ** TEST CRUD PRODUCTS **`, () => {
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

  describe('\n ✔ GET / PRODUCTS', () => {
    test('Should respond with a 200 status code             ◾ Debe responder con un código de estado 200', async () => {
      const response = await request(app).get('/api/get_products').send();
      expect(response.statusCode).toBe(200);
    });

    test('Should respond an array                           ◾ Debe responder una matriz', async () => {
      const response = await request(app).get('/api/get_products').send();
      expect(response.body).toBeInstanceOf(Array);
    });
  });

 

  describe('\n ✔ POST/ PRODUCT', () => {
    describe('Given a new product                              Enviado un nuevo producto', () => {
      const newProdutc = {
        "name": "Birra test",
        "price": 4.50,
        "description": "Dato de Prueba",
        "category": "Tostada",
        "total": 500,
        "brand": "Hacendado",
        "type": "",
        "graduation": 6.3,
        "packaging": 6,
        "zone": "Belga",
        "score": 5.7,
        "novelty": "true",
        "photo1": "url del local Storage del la foto1",
        "photo2": "url del local Storage del la foto1",
        "photo3": "url del local Storage del la foto1",
        "photo4": "url del local Storage del la foto1"
    
      };

      // Debe responder con un código 201
      test('Should respond with a 201 status code           ◾ Debe responder con un código de estado 201', async () => {
        const response = await request(app)
          .post('/api/add_product')
          .send(newProdutc);
        expect(response.statusCode).toBe(201);
      });

      // Debe responder a un JSON como tipo de contenido
      test('Should have a Content-Type: application/json    ◾ Debe responder a un JSON como tipo en el header', async () => {
        const response = await request(app)
          .post('/api/add_product')
          .send(newProdutc);
        expect(response.headers['content-type']).toEqual(
          expect.stringContaining('json')
        );
      });

      // Debeia responder con un objeto JSON que contiene la nuevo Producto con una identificación
      test("Should respond with an product ID               ◾ Debe responder con un ID de producto", async () => {
        const response = await request(app).post("/api/add_product").send(newProdutc);
        expect(response.body.id);
      });
  //   });
  });
  describe('\n ✔ DELETE / PRODUCT', () => {
    test('Should respond with a 404 status code           ◾ Debe responder con un código de estado 404', async () => {
      const response = await request(app).get('/api/delete_product/63af1fd25881098066587336').send();
      expect(response.statusCode).toBe(404);
    });

    test('Should respond an Object                        ◾ Debe responder una Objeto', async () => {
      const response = await request(app).get('/api/delete_product').send();
      expect(response.body).toBeInstanceOf(Object);
    });
  });

  });
});

