const API_TOKEN = 'https://opentdb.com/api_token.php?command=request';

async function resolverApi() {
  return fetch(API_TOKEN)
  .then((response) => response.json()
  .then((token) => (response.ok ? Promise.resolve(token) : Promise.reject(token))),
  );
}

export default resolverApi;
