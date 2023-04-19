const axios = require('axios');
const chai = require('chai');

const expect = chai.expect;

describe('Loading recipes', () => {
    it('Should load all recipes', async () => {
      const response = await axios.get(`http://localhost:8080/recipes`);
 
      // Assuming that the first recipe is returned in the response data
      const expectedSong = response.data[0];
 
      // Assertions using Chai
      expect(response.status).to.equal(200);
      expect(response.data).to.be.an('array');
      expect(expectedSong).to.have.property('name');
      expect(expectedSong).to.have.property('ingredients');
    });
  });