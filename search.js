require('dotenv').config();

const algoliaSearch = require('algoliasearch');

const algolia = algoliaSearch(
  process.env.ALGOLIA_APP_ID, 
  process.env.ALGOLIA_SEARCH_API_KEY
);

const index = algolia.initIndex(process.env.ALGOLIA_INDEX_NAME);

const query = 'covid';

index.search(query)
  .then((results) => console.log('Success:', results))
  .catch((error) => console.log('Error:', error));