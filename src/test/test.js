const request = require('supertest');
const chai = require('chai');
const server = require('../server');
const db = require('../db')
const assert = require('assert');


describe("test api", () => {
    before(() => {
         let models = [db.User, db.Notification, db.Response]
        models.forEach((model) => {
            model.destroy({where: {},
            truncate: {cascade:  true}})
        }) 
        db.User.create({id:2, name:"mock", token:"mock", password:"mock"});    
    })

    it('should register', (done) => {
        request(server).post('/register').send( {user: "arto", password: "test", repeatPass: "test"})
        .expect({message: "User created"}, done);
    }) 
    
    it('should not register with wrong repeated password', (done) => {
        request(server).post('/register').send( {user: "testeri", password: "test", repeatPass: "tes"})
        .expect(403, {error: "Passwords didn't match"}, done);
    }) 

    it('should not register when username is taken', (done) => {
        request(server).post('/register').send( {user: "arto", password: "test", repeatPass: "test"})
        .expect(400, {error: "Username is taken"}, done);
    }) 
 
    it('should login', (done) => {
        request(server).post('/login').send( {user: "arto", password: "test"})
        .expect(200, done);
    })

    it('should not login', (done) => {
        request(server).post('/login').send( {user: "arto", password: "asd"})
        .expect({error:"Wrong username or password"}, done);
    })

    it('should post', (done) => {
        request(server).post('/notifications')
        .send({user:"mock", token:"mock", userId:2, header:"test", content:"test notif"})
         .expect(200)
          .then(response => {
            assert(response.body.header, 'test')
            assert(response.body.content, 'test notif')
            assert(response.body.userId, 2);
            done();
        })
    })

    it('should fetch notifications', (done) => {
        request(server).get('/notifications')
        .expect(200)
        .then(response => {
            assert(response.body[0].header, 'test')
            assert(response.body[0].content, 'test notif')
            assert(response.body[0].userId, 2);
            done();
        })
    })

    it('should not post', (done) => {
        request(server).post('/notifications')
        .send({user:"mock", token:"wrong token", userId:2, header:"test", content:"test notif"})
         .expect(401, done);   
    })

    it('should logout', (done) => {
        request(server).post('/logout')
        .send({token:"mock"})
        .expect(200, done);
    })




})