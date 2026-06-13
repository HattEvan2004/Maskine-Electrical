const { createClient } = require('@sanity/client');
const imageUrlBuilder = require('@sanity/image-url').default;
const client = createClient({ projectId: '294vu9cu', dataset: 'production', apiVersion: '2024-01-01', useCdn: false });
const builder = imageUrlBuilder(client);
client.fetch('*[_type == "siteSettings"][0]{logo}').then(d => {
  if (d && d.logo) {
    console.log('LOGO URL:');
    console.log(builder.image(d.logo).url());
  } else {
    console.log('no logo found');
  }
}).catch(e => console.log('ERROR: ' + e.message));
