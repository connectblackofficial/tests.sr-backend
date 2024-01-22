import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';
import SequelizeWallet from '../database/models/SequelizeWallet';
import { loginUser } from './mocks/user.mocks';
import { 
  newWallet,
  newAddWallet,
  addWallet,
  succesAddWallet,
  subtractWallet,
  subtractWalletInvalid
} from './mocks/wallet.mocks';
import Validations from '../middlewares/Validations';

chai.use(chaiHttp);

const { app } = new App();
const { expect } = chai;

//@ts-ignore
describe('Wallets tests', () => {
  //@ts-ignore
  it('Should create wallet', async () => {
    sinon.stub(SequelizeWallet, 'findOne').resolves(null);
    sinon.stub(SequelizeWallet, 'create').resolves(newWallet as any);
    //@ts-ignore
    sinon.stub(Validations, 'validateCreateWallet').returns();

    const responseLogin = await chai
      .request(app)
      .post('/login').send({
      email: loginUser.email,
      password: loginUser.password,
    });

    const { id, ...sendData } = newWallet;

    const { status, body } = await chai
      .request(app)
      .post('/api/wallet')
      .auth(responseLogin.body.token, { type: 'bearer' })
      .send(sendData);

    expect(status).to.equal(201);
    expect(body).to.deep.equal(newWallet);
  });

  //@ts-ignore
  it('Should return wallet by user id 1', async () => {
    sinon.stub(SequelizeWallet, 'findByPk').resolves(newWallet as any);

    const responseLogin = await chai
      .request(app)
      .post('/login').send({
        email: loginUser.email,
        password: loginUser.password,
      });

    const { status, body } = await chai
      .request(app)
      .get('/api/wallet/1')
      .auth(responseLogin.body.token, { type: 'bearer' });

    expect(status).to.equal(200);
    expect(body).to.deep.equal(newWallet);
  });

  //@ts-ignore
  it('Must add balance to user wallet', async () => {
    sinon.stub(SequelizeWallet, 'findOne').resolves(newWallet as any);
    sinon.stub(SequelizeWallet, 'update').resolves([1] as any);
    sinon.stub(SequelizeWallet, 'findByPk').resolves(newAddWallet as any);
    //@ts-ignore
    sinon.stub(Validations, 'validateCreateWallet').returns();

    const responseLogin = await chai
    .request(app)
    .post('/login').send({
      email: loginUser.email,
      password: loginUser.password,
    });

    const { status, body } = await chai
      .request(app)
      .post('/api/wallet/add')
      .auth(responseLogin.body.token, { type: 'bearer' })
      .send(addWallet);

    const balance = newAddWallet.balance;

    expect(status).to.equal(200);
    expect(body).to.deep.equal(succesAddWallet(balance));
  });

  //@ts-ignore
  it('Must subtract balance to user wallet', async () => {
    sinon.stub(SequelizeWallet, 'findOne').resolves(newAddWallet as any);
    sinon.stub(SequelizeWallet, 'update').resolves([1] as any);
    sinon.stub(SequelizeWallet, 'findByPk').resolves(newWallet as any);
    //@ts-ignore
    sinon.stub(Validations, 'validateCreateWallet').returns();

    const responseLogin = await chai
    .request(app)
    .post('/login').send({
      email: loginUser.email,
      password: loginUser.password,
    });

    const { status, body } = await chai
      .request(app)
      .post('/api/wallet/subtract')
      .auth(responseLogin.body.token, { type: 'bearer' })
      .send(subtractWallet);

    const balance = newWallet.balance;

    expect(status).to.equal(200);
    expect(body).to.deep.equal(succesAddWallet(balance));
  });

  //@ts-ignore
  it('An error should return when trying to subtract an account with an insufficient balance', async () => {
    sinon.stub(SequelizeWallet, 'findOne').resolves(newAddWallet as any);
    const responseLogin = await chai
    .request(app)
    .post('/login').send({
      email: loginUser.email,
      password: loginUser.password,
    });

    const { status, body } = await chai
      .request(app)
      .post('/api/wallet/subtract')
      .auth(responseLogin.body.token, { type: 'bearer' })
      .send(subtractWalletInvalid);

    expect(status).to.equal(400);
    expect(body).to.deep.equal({ message: 'Insufficient funds' });
  });

  //@ts-ignore
  afterEach(sinon.restore);
});
