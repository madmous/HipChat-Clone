'use strict';

const mongoose = require('mongoose');
const chaiHttp = require('chai-http');
const chai     = require('chai');

const userModel = require('../../src/models/index').userModel;

const log = require('../../src/libs/winston')(module);
const app	= require('../../src/index');

chai.use(chaiHttp);

const signupUrl = '/api/v1/signup/';
const assert   = chai.assert;

describe('Signup' , () => {

	after(done => {
		userModel.find().remove().exec();

		done();
	});

	describe('/POST', () => {
    
    it ('should signup - sucess', done => {
			const user = {
				name: 'testName',
				fullname: 'testFullname',
				password: 'testPassword',
				initials: 'testInitials',
				email: 'testEmail@email.com'
			};

			chai.request(app)
				.post(signupUrl)
				.send(user)
				.end((err, res) => {
					assert.equal(res.status, '200', 'status equals 200');

					done();
				});
		});

		it ('should signup - fail', done => {
			const user = {
				name: 'testName',
				fullname: 'testFullname',
				password: 'testPassword',
				initials: 'testInitials',
				email: 'testEmail@email.com'
			};

			chai.request(app)
				.post(signupUrl)
				.send(user)
				.end((err, res) => {
					assert.equal(res.status, '404', 'status equals 404 because username already exists');
					done();
				});
		});

		it ('should signup - fail', done => {
			const user = {
				name: 'testName2',
				fullname: 'testFullname',
				password: 'testPassword',
				initials: 'testInitials',
				email: 'testEmail@email.com'
			};

			chai.request(app)
				.post(signupUrl)
				.send(user)
				.end((err, res) => {
					assert.equal(res.status, '404', 'status equals 404 because email already exists');

					done();
				});
		});

		it ('should signup - fail', done => {
			const user = {
				fullname: 'testFullname',
				password: 'testPassword',
				initials: 'testInitials',
				email: 'testEmail@email.com'
			};

			chai.request(app)
				.post(signupUrl)
				.send(user)
				.end((err, res) => {
					assert.equal(res.status, '400', 'status equals 400 because name is missing');
					done();
				});
		});

		it ('should signup - fail', done => {
			const user = {
				name: 'testName',
				password: 'testPassword',
				initials: 'testInitials',
				email: 'testEmail@email.com'
			};

			chai.request(app)
				.post(signupUrl)
				.send(user)
				.end((err, res) => {
					assert.equal(res.status, '400', 'status equals 400 because fullname is missing');
					done();
				});
		});

		it ('should signup - fail', done => {
			const user = {
				name: 'testName',
				fullname: 'testFullname',
				initials: 'testInitials',
				email: 'testEmail@email.com'
			};

			chai.request(app)
				.post(signupUrl)
				.send(user)
				.end((err, res) => {
					assert.equal(res.status, '400', 'status equals 400 because password is missing');
					done();
				});
		});

		it ('should signup - fail', done => {
			const user = {
				name: 'testName',
				fullname: 'testFullname',
				password: 'testPassword',
				email: 'testEmail@email.com'
			};

			chai.request(app)
				.post(signupUrl)
				.send(user)
				.end((err, res) => {
					assert.equal(res.status, '400', 'status equals 400 because initials missing');
					done();
				});
		});

		it ('should signup - fail', done => {
			const user = {
				name: 'testName',
				fullname: 'testFullname',
				password: 'testPassword',
				initials: 'testInitials'
			};

			chai.request(app)
				.post(signupUrl)
				.send(user)
				.end((err, res) => {
					assert.equal(res.status, '400', 'status equals 400 because email is missing');
					done();
				});
		});

		it ('should signup - fail', done => {
			const user = {
				password: 'testPassword',
				initials: 'testInitials',
				email: 'testEmail@email.com'
			};

			chai.request(app)
				.post(signupUrl)
				.send(user)
				.end((err, res) => {
					assert.equal(res.status, '400', 'status equals 400 because username and full name are missing');
					done();
				});
		});

		it ('should signup - fail', done => {
			const user = {
				initials: 'testInitials',
				email: 'testEmail@email.com'
			};

			chai.request(app)
				.post(signupUrl)
				.send(user)
				.end((err, res) => {
					assert.equal(res.status, '400', 
							'status equals 400 because username, full name and password are missing');
					done();
				});
		});

		it ('should signup - fail', done => {
			const user = {
				email: 'testEmail@email.com'
			};

			chai.request(app)
				.post(signupUrl)
				.send(user)
				.end((err, res) => {
					assert.equal(res.status, '400', 
							'status equals 400 because username, full name, password and initials are missing');
					done();
				});
		});

		it ('should signup - fail', done => {
			chai.request(app)
				.post(signupUrl)
				.end((err, res) => {
					assert.equal(res.status, '400', 
							'status equals 400 because all arguments are missing');
					done();
				});
		});
	});
});