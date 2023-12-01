import supertest from 'supertest'
import app from '../app.js'

describe("/signup", ()=>{
    describe("sign up using new email")
    describe("sign up using existing custom email")
    describe("sign up using existing google email")
})

describe("/login", ()=>{
    describe("login with email and password")
    describe("login with unregistered email and password")
    describe("login with email and wrong password")
    describe("login with linked google email and password")
})

//return personal profile with a given employeeId
describe("/profile", ()=>{
})

//return employe salary history
describe("/salaries", ()=>{
})

//return employe titles history
describe("/titles", ()=>{
})

//check and return authentication info with a google email
describe("/auth/googleUser", ()=>{
})

//
describe("/auth/uploadEmployeeId", ()=>{
})

describe("/users", ()=>{
})


describe("/getemployeedata/:id", ()=>{
})


describe("addemployee", ()=>{
})

describe("/empdistribution", ()=>{
})