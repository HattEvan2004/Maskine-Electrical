const { createClient } = require('@sanity/client');
const client = createClient({
  projectId: '294vu9cu',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false
});
client.fetch('*[_type == "siteSettings"][0]{logo, logoSize}').then(d => {
  console.log(JSON.stringify(d, null, 2));
}).catch(e => console.log('ERROR: ' + e.message));
