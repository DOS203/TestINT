const request = require('supertest')
    ,app = require('../routes/users');
    
    const {ensureAuthenticated} = require('../helpers/auth');


    // Login Integration Testing
describe("Login page", function() {
    it("Direct to Login page", function() {
 
        request(app).get("/login")
            .expect(200)
            
    })
})

describe("Login page", function() {
    it("Post email and password", function() {
        request(app).post("/login")
            .send({email: "dead3@mail.com", password:"asdasd"})
            .expect(302)
            .expect('Location', /\//)
            .expect('Location', /\/login/)
 
            
    
    })
})


// Register Integration Testing

describe("Register page", function() {
    it("Direct to Register page", function() {
 
        request(app).get("/register")
            .expect(200)
    })
})

describe("Register page", function() {
    it("Post New user data", function() {
        request(app).post("/register")
            .send({firstname: "max", lastname:"don", email:"don@mail.com", password:"testpass", password2: "testpass" })
            .expect(302)
            .expect('Location', /\//)
            .expect('Location', /\/register/)
       
    
    })
})


//Logout

describe("Logout", function() {
    it("User Logout from EasyGo", function(done) {
 
        request(app).get("/login")
            .expect(200)
            done();
    })
})


//Edit

describe("Edit", function() {
    it("User Edit from EasyGo", function(done) {
 
        request(app).get("/edit")
            .expect(200)
            done();
    })
})


describe("Edit Profile page", function() {
    it("Put update user data", function() {
        request(app).put("//:id")
            .send({firstname: "max", lastname:"don", email:"don@mail.com"})
            .expect(302)
            .expect('Location', /\//)
       
    
    })
})