const expect = require('chai').expect;
const app = require('../index.js');
const request = require('supertest');

//let's set up the data we need to pass to the login method
const userCredentials = {
  email: 'arthur.rimbaud@yahoo.fr',
  password: 'tototata'
}
//now let's login the user before we run any tests
const authenticatedUser = request.agent(app);
 before(function(done){
   authenticatedUser
     .get('/')
     .send(userCredentials)
     .end(function(err, response){
     expect(response.status).to.equal(200);
      done();
    });
 });


//this test says: make a POST to the /login route with the email: arthur.rimbaud@yahoo.fr, password: 'tototata'
//after the POST has completed, make sure the status code is 200
//also make sure that the user has been directed to the home page

describe('GET /', function(done){
  //addresses 1st bullet point: if the user is logged in we should get a 200 status code
    it('should return a 200 response if the user is logged in', function(done){
      authenticatedUser.get('/')
      .expect(200, done);
    });
  //addresses 2nd bullet point: if the user is not logged in we should get a 302 response code and be directed to the /login page
    it('should return a 302 response and redirect to /login', function(done){
      request(app).get('/logout')
      .expect(302, done);
    });
  });

