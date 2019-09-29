const request = require('supertest');
const {ensureAuthenticated} = require('../helpers/auth');
const app = require('../app');
const User = require('../models/User');
const mongoose = require('mongoose')
const databaseName = 'test'

const userOne = {
    firstname: 'Mark',
    lastname: 'moo',
    email: "markhd@mail.com",
    password: 'jack123'
}



test('Should signup a new user', async() => {
  const response =  await request(app).post('/users/register').send({
        firstname: 'Jack',
        lastname: 'joso',
        email: 'jack2js@mail.com',
        password: 'jack123',
        password2: 'jack123'
        
    }).expect(302)
   


})
   

test('Should not signup with unmatched password', async() => {
    await request(app).post('/users/register').send({
        firstname: 'Jack',
        lastname: 'joso',
        email: 'jack2js@mail.com',
        password: 'jack123',
        password2: 'jack12s'
    }).expect(200)
})

test('Should login existing user', async() => {
    await request(app).post('/users/login').send({
        email: 'jack2js@mail.com',
        password: 'jack123'
    }).expect(302)
})

test('Should not login nonexisting user', async() => {
    await request(app).post('/users/login').send({
        email: 'jack2js@mail.com',
        password: 'jack123ss'
    }).expect(302)
})

test('Should get profile for user', async() => {
    await request(app)
    .get('/users/edit')
    .set('Auth', {ensureAuthenticated})
    .send().expect(302);
}) 

test('Should update profile for user', async() => {
    await request(app).put('/users/edit').send({
       email: 'jack2ww@mail.com'
    }).expect(302)
})

test('Should logout profile for user', async() => {
    await request(app).post('/users/logouht').send().expect(200)
})


test('Should get 404 page', async() => {
    await request(app)
    .get('/hi').expect(200);
}) 
 
test('Should delete profile for user', async() => {
    await request(app)
    .get('/users/areusure')
    .set('Auth', {ensureAuthenticated})
    .send().expect(302);
}) 
afterEach(async () => {
    await User.deleteMany()
  
  })

