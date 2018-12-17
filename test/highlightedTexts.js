import chai from 'chai';
import chaiHttp from 'chai-http';

// import highlightedTextUpdater from '../lib/highlitedTextsUpdater';

chai.use(chaiHttp);
chai.should();

describe('Article Helper tests', () => {
  it('should create store a highlighted text and its comment in the database', async () => {});
  it('should fetch all comments of a highlighted text from the database', async () => {});
  it('should fetch all the highlighted texts belonging to an article from the database', async () => {});
  it('should update the index positions of a highlighted text within the database', async () => {});
});
