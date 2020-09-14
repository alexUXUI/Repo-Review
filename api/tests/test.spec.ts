import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { testServer } from './test-server';

describe('API End Points', () => {
    describe('/index', () => {
        it('/ Should return a 200', () => {
            chai.use(chaiHttp)
                .request(testServer)
                .get('/')
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res).to.not.have.status(500);
                });
        });

        it('Should handle 404 requests', () => {
            chai.use(chaiHttp)
                .request(testServer)
                .get('/wghj')
                .end((err, res) => {
                    expect(res.status).to.eq(404);
                });
        });
    });

    describe('GET /search/github/repos/:query', () => {
        it('Should allow user to search github', () => {
            chai.use(chaiHttp)
                .request(testServer)
                .get('/search/github/repos/rust')
                .end((err, res) => {
                    expect(res.text).to.not.be.null;
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                });
        });
    });
});
