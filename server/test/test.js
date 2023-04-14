import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/index.js'

chai.use(chaiHttp)
const expect = chai.expect;


// GET ALL MEDIA FOR COLDPLAY -> CALLING ITUNES API
describe("Test to return all recipes", () => {
    it('should return a 200 status code for the homepage', (done) => {
        chai.request(app)
        .get('/recipes/')
        .end((err, res) => {
            expect(res).to.have.status(200);
            done()
        })
    })
})
