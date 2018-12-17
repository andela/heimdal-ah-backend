import chai from 'chai';
import chaiHttp from 'chai-http';

import { createNewTags } from '../../helpers/articleHelper';

chai.use(chaiHttp);
chai.should();

describe('Article Helper tests', () => {
  it('should create new tags and return an array of tagIds', async () => {
    const result = await createNewTags(['food', 'rice', 'beans']);
    result.should.be.an('array');
  });
});
