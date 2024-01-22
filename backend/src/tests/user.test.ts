import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';
import SequelizeUser from '../database/models/SequelizeUser';
import { loginUser, user, invalidLoginUser } from './mocks/user.mocks';
import Validations from '../middlewares/Validations';

chai.use(chaiHttp);
 
const { app } = new App();
const { expect } = chai;

//@ts-ignore
describe('User tests', () => {
  //@ts-ignore
  it('Should create', async () => {
    sinon.stub(SequelizeUser, 'create').resolves(user as any);
    sinon.stub(Validations, 'validateCreateUser').returns();

    const { id, ...sendData } = user;

    const { status, body } = await chai.request(app).post('/user')
      .send(sendData);

    expect(status).to.equal(201);
    expect(body).to.deep.equal(user);
  });

  //@ts-ignore
  it('Should return an error when trying to create a user with an invalid email', async () => {
    const { status, body } = await chai
      .request(app)
      .post('/user')
      .send(invalidLoginUser);

    expect(status).to.equal(401);
    expect(body.message).to.deep.equal('Invalid email or password');
  });

  //@ts-ignore
  it('Should return an error when trying to create a user without all information', async () => {
    const { id, email, ...sendData } = user;

    const { status, body } = await chai
      .request(app)
      .post('/user')
      .send(sendData);

    expect(status).to.equal(400);
    expect(body.message).to.deep.equal('All fields must be filled');
  });

  //@ts-ignore
  it('Should return user by id', async () => {
    sinon.stub(SequelizeUser, 'findByPk').resolves(user as any);

    const responseLogin = await chai
      .request(app)
      .post('/login').send({
      email: loginUser.email,
      password: loginUser.password,
    });

    const response = await chai
      .request(app)
      .get('/user')
      .auth(responseLogin.body.token, { type: 'bearer' });

    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal(user);
  });

  //@ts-ignore
  afterEach(sinon.restore);
});
