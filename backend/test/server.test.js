const request = require('supertest');
const express = require('express');
const customLogin = require('../api/customLogin');
const session = require('express-session');
const service = require('../api/service');
const user = require('../api/user');
const mockSession = {
    cookie: {
        path: '/',
        _expires: new Date('2023-12-20T03:45:48.414Z'),
        originalMaxAge: 3600000,
        httpOnly: true,
        secure: false
    },
    user: {
        email: 'taile4920@gmail.com',
        role: 'employee',
        employeeId: '10005'
    }
};

const mockAdminSession = {
    cookie: {
        path: '/',
        _expires: new Date('2023-12-20T03:45:48.414Z'),
        originalMaxAge: 3600000,
        httpOnly: true,
        secure: false
    },
    user: {
        email: 'admin@gmail.com',
        role: 'manager',
        employeeId: '110420'
    }
};

describe("/signup", ()=>{
    describe("sign up using existing email"  , () => {
        const server = express();
        const data = {
            email: "taile4920@gmail.com",
            password: "123456",
            employeeId: "45654",
        }
        server.use((req, res, next) => {
            req.body = data;
            req.session = [];
            next();
        });
        server.use(customLogin);
        server.use(express.json());
        it("should return 403", async () => {
            const res = await request(server).post("/signup")
                .send({
                    email: "taile4920@gmail.com",
                    password: "123456",
                    employeeId: "45654"
                })
                .expect(409);
        });
    });

        describe("sign up using not email"  , () => {
        const server = express();
        const data = {
            email: "taile49om",
            password: "123456",
            employeeId: "10006",
        }
        server.use((req, res, next) => {
            req.body = data;
            req.session = [];
            next();
        });
        server.use(customLogin);
        server.use(express.json());
        it("should return 404", async () => {
            const res = await request(server).post("/signup")
                .send({
                    email: "taile49om",
                    password: "123456",
                    employeeId: "10006"
                })
                .expect(404);
        });
    });

    describe("sign up with missing field"  , () => {
        const server = express();
        const data = {
            email: "taile49@gmail.com",

            employeeId: "10006"
        }
        server.use((req, res, next) => {
            req.body = data;
            req.session = [];
            next();
        });
        server.use(customLogin);
        server.use(express.json());
        it("should return 400", async () => {
            const res = await request(server).post("/signup")
                .send({
                    email: "taile49om",

                    employeeId: "10006"
                })
                .expect(400);
        });
    });

        describe("sign up with not exist employee ID"  , () => {
        const server = express();
        const data = {
            email: "taile49480194@gmail.com",
            password: "123456",
            employeeId: "4809184098"
        }
        server.use((req, res, next) => {
            req.body = data;
            req.session = [];
            next();
        });
        server.use(customLogin);
        server.use(express.json());
        it("should return 404", async () => {
            const res = await request(server).post("/signup")
                .send({
                    email: "taile49480194@gmail.com",
                    password: "123456",
                    employeeId: "4809184098"
                })
                .expect(404);
        });
    });

    describe("sign up using new email" , () => {
        const server = express();
        const data = {
            email: "newtest124@gmail.com",
            password: "123456",
            employeeId: "45655",
        }

        server.use((req, res, next) => {
            req.body = data;
            req.session = [];
            next();
        });
        server.use(customLogin);
        server.use(express.json());
        it("should return 200 OK", async () => {
            const res = await request(server).post("/signup")
                .send({
                    email: "newtest123@gmail.com",
                    password: "123456",
                    employeeId: "45654"
                })
                .expect(201);
        });
    });

    // describe("sign up using existing google email")
});

describe("POST /login", ()=>{
    describe("login with email and password",  ()  => {
        const server5 = express();
        const data = {
            email: "taile4920@gmail.com",
            password: "123456"
        }
        server5.use((req, res, next) => {
            req.body = data;
            req.session = [];
            next();
        });
        server5.use(customLogin);
        server5.use(express.json());
        it("should return 200 OK", async () => {

            const res = await request(server5).post("/login")
                .send({
                    email: "taile4920@gmail.com",
                    password: "123456"
                })
                .expect(200);
        });
    });
    describe("login with unregistered email and password", () => {
        const server6 = express();
        const data = {
            email: "asldkj@gmai;.com",
            password: "123456"
        }
        server6.use((req, res, next) => {
            req.body = data;
            req.session = [];
            next();
        });
        server6.use(customLogin);
        server6.use(express.json());
        it("should return 404", async () => {
            const res = await request(server6).post("/login")
                .send({
                    email: "asldkj@gmai;.com",
                    password: "123456"
                })
                .expect(404);
            });
    });

    describe("login with email and wrong password", () => {
        const server7 = express();
        const data = {
            email: "taile4920@gmail.com",
            password: "1234567"
        }
        server7.use((req, res, next) => {
            req.body = data;
            req.session = [];
            next();
        });
        server7.use(customLogin);
        server7.use(express.json());
        it("should return 401", async () => {
            const res = await request(server7).post("/login")
                .send({
                    email: "taile4920@gmail.com",
                    password: "1234567"
                })
                .expect(401);
        });
    });

    // describe("login with linked google email and password")
});



describe('GET /profile', () => {
    const server = express(); // Use express() instead of http.createServer(app);

    // Add this middleware to set the session in the request
    server.use((req, res, next) => {
        req.session = mockSession;
        next();
    });

    server.use(service); // Use app as middleware

    it('should return user profile when authenticated', async () => {
        const response = await request(server)
            .get('/profile')
            .expect(200);
    });


});



describe("GET /salary", ()=>{
    const server = express();
    server.use((req, res, next) => {
        req.session = mockSession;
        next();
    });
    server.use(service);
    it('should return user salary when authenticated', async () => {
        const response = await request(server)
            .get('/salary')
            .expect(200); 
    });
})


describe("GET /titles", ()=>{
    const server = express();
    server.use((req, res, next) => {
        req.session = mockSession;
        next();
    });
    server.use(service);
    it('should return user titles when authenticated', async () => {
        const response = await request(server)
            .get('/titles')
            .expect(200); 
    });

})

describe("GET /users", ()=>{
    const server2 = express();


    server2.use((req, res, next) => {
        req.session = mockSession;
        next();
    });
    server2.use(user);
    it('should return 401 when not authenticated', async () => {
        const response = await request(server2)
            .get('/users')
            .expect(401); 
    });

})


describe("GET /users", ()=>{
    const server3 = express();

    server3.use((req, res, next) => {
        req.session = mockAdminSession;
        req.query.term =  "Kyoichi Maliniak";
        next();
    });
    server3.use(user);


    it('should return all users when authenticated', async () => {
        const response = await request(server3)
            .get('/users')
            .expect(200); 
    });
})

describe("GET /users", ()=>{
    const server4 = express();

    server4.use((req, res, next) => {
        req.session = mockAdminSession;

        next();
    });
    server4.use(user);
    it('should return 200 for admin', async () => {
        const response = await request(server4)
            .get('/users')
            .expect(200); 
    });
});


describe("POST /addemployee", ()=>{
    const server = express();
    const data = {
        employeeId: "10005",
        birth_date: "1955-01-21",
        first_name: "Kyo",
        last_name: "Peac",
        from_date: "2021-01-01",
        to_date: "2025-01-01",
        dep_no: "d009",
        dep_name: "Customer Service",
        role: "employee"
    }
    server.use((req, res, next) => {
        req.session = mockAdminSession;
        req.body = data;
        next();
    });
    server.use(user);
    server.use(express.json());
    it('should return 403', async () => {
        const data = {
            employeeId: "10005",
            birth_date: "1955-01-21",
            first_name: "Kyo",
            last_name: "Peac",
            from_date: "2021-01-01",
            to_date: "2025-01-01",
            dep_no: "d009",
            dep_name: "Customer Service",
            role: "employee"
        };

        const response = await request(server)
            .post('/addemployee')
            .expect(403);
    });

})


describe("GET /getemployeedata/:id", ()=>{
    const server = express();
    server.use((req, res, next) => {
        req.session = mockSession;
        req.params.id = "10005";
        next();
    });
    server.use(user);
    it('should return 200', async () => {
        const response = await request(server)
            .get('/getemployeedata/10005')
            .expect(200); 
    });

    it("should return 500 for incorrect id", async () => {
        const response = await request(server)
            .get('/getemployeedata/1005')
            .expect(500); 
    });
})



describe("/empdistribution", ()=>{
    const server = express();
    server.use((req, res, next) => {
        req.session = mockAdminSession;
        next();
    });
    server.use(user);
    it('should return 200', async () => {
        const response = await request(server)
            .get('/empdistribution')
            .expect(200); 
    });
})



describe("GET /getEmployeeSalary", ()=>{
    const server = express();


    server.use((req, res, next) => {
        req.session = mockSession;
        req.query.term =  "Tai Le";
        next();
    });
    server.use(user);
    it('should return 404', async () => {
        const response = await request(server)
            .get('/getEmployeeSalary')
            .expect(404); 
    });


});

describe("GET /getEmployeeSalary", ()=>{
    const server = express();


    server.use((req, res, next) => {
        req.session = mockAdminSession;
        req.query.term =  "Tai Le";
        next();
    });
    server.use(user);
    it('should return 404', async () => {
        const response = await request(server)
            .get('/getEmployeeSalary')
            .expect(404); 
    });


});

describe("GET /getEmployeeSalary", ()=>{
    const server = express();
    server.use((req, res, next) => {
        req.session = mockAdminSession;
        req.query.term =  "Kyoichi Maliniak";
        next();
    });
    server.use(user);
    it('should return 200', async () => {
        const response = await request(server)
            .get('/getEmployeeSalary')
            .expect(200); 
    });

});

