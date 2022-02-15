const sanityClient = require('@sanity/client');
const fs = require('fs');

const sanity = sanityClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  apiVersion: process.env.SANITY_API_VERSION,
  useCdn: false
});

sanity
  .fetch(getQuery())
  .then((products) => writeFile(products, `${__dirname}/products.json`))
  .then((result) => console.log(`Ok! ${result}`))
  .catch((error) => console.log('Error:', error));

function writeFile(data, pathName) {
  return new Promise((resolve, reject) => {
    const wstream = fs.createWriteStream(pathName);
    wstream.on('finish', () => resolve(pathName));
    wstream.on('error', (err) => reject(err));
    wstream.write(JSON.stringify(data, null, 2));
    wstream.end();
  });
}

function getQuery () {
  return `
    *[_type == "product" && hideFromSearchResults != true] {
      "objectID": _id,
      _type,
      _rev,
      title,
      "description": pt::text(description),
      quickDescription,
      benefits,
      tags,
    }[0...100]
  `;
}