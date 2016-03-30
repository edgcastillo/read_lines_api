var app = require('./server.js');
var request = require('supertest');
var expect = require('chai').expect;
var async = require('async');


describe('LINES', function(){
  it('should create a response', function(done){
    request(app)
      .get('/lines')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, resp){
        expect(resp.body).to.be.an('object');
        done();
      })
  });

  it('should respond with a number of lines', function(done){
    request(app)
      .get('/lines')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res){
        expect(res.body.totalLines).to.be.an('number');
        done();
      })
  });

  it('should respond with an object', function(done){
    request(app)
      .get('/lines/' + 30)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res){
        expect(res.body).to.be.an('object');
        done();
      })
  });

  it('should throw an error', function(done){
    request(app)
      .get('/lines/' + 150)
      .expect(413)
      done();
  });
});
