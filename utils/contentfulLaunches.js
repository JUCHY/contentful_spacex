const space = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;

const client = require('contentful').createClient({
  space,
  accessToken,
});

export async function fetchEntries(contentType) {
  const entries = await client.getEntries({
    content_type: `${contentType}`,
  });
  if (entries.items) return entries.items;
  throw (new Error(`Error getting Entries for ${contentType}.`));
}

export default { fetchEntries };
