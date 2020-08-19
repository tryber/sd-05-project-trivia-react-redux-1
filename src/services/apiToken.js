const API_TOKEN = 'https://opentdb.com/api_token.php?command=request';
const resolverApi = () => fetch(API_TOKEN)
  .then((response) => response.json())
  .then((data) => data);

export default resolverApi;
