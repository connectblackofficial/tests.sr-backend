import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');
import { App } from '../app';
import SequelizeUser from '../database/models/SequelizeUser';
import { loginInvalid, loginValid, userLogin, passwordInvalid } from './mocks/login.mocks';
import Validations from '../middlewares/Validations';

chai.use(chaiHttp);

const { app } = new App();
const { expect } = chai;

// @ts-ignore
describe('Login tests', () => {
  // @ts-ignore
  it('Login successfully', async () => {
    sinon.stub(Validations, 'validateLogin').returns();
    sinon.stub(SequelizeUser, 'findOne').resolves(userLogin as any);

    const { status, body } = await chai
      .request(app)
      .post('/login')
      .send(loginValid);
    
    expect(status).to.equal(200);
    expect(body).to.have.property('token');
  });

  // @ts-ignore
  it('Login failed, email invalid', async () => {
    sinon.stub(Validations, 'validateLogin').returns();
    sinon.stub(SequelizeUser, 'findOne').resolves(null);

    const { status, body } = await chai
      .request(app)
      .post('/login')
      .send(loginInvalid);
    
    expect(status).to.equal(401);
    expect(body.message).to.equal('Invalid email or password');
  });

  // @ts-ignore
  it('Login failed, password invalid', async () => {
    sinon.stub(Validations, 'validateLogin').returns();
    sinon.stub(SequelizeUser, 'findOne').resolves(userLogin as any);

    const { status, body } = await chai
      .request(app)
      .post('/login')
      .send(passwordInvalid);
    
    expect(status).to.equal(401);
    expect(body.message).to.equal('Invalid email or password');
  });

  // @ts-ignore
  it('Must check if user is authenticated', async () => {
    sinon.stub(SequelizeUser, 'findByPk').resolves(userLogin as any);

    const responseLogin = await chai
      .request(app)
      .post('/login').send({
      email: userLogin.email,
      password: userLogin.password,
    });

    const { status, body } = await chai
      .request(app)
      .get('/login/authenticated')
      .auth(responseLogin.body.token, { type: 'bearer' });

    expect(status).to.equal(200);
    expect(body.message).to.equal('Authenticated user');
  });

  //@ts-ignore
  it('Check if the user is not authenticated', async () => {
    sinon.stub(SequelizeUser, 'findByPk').resolves(null as any);

    const responseLogin = await chai
      .request(app)
      .post('/login').send({
      email: userLogin.email,
      password: userLogin.password,
    });

    const { status, body } = await chai
      .request(app)
      .get('/login/authenticated')
      .auth(responseLogin.body.token, { type: 'bearer' });

    expect(status).to.equal(401);
    expect(body.message).to.equal('user not found');
  });

  // @ts-ignore
  afterEach(sinon.restore);
});