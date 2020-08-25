
// function resolveQuestions() {
//   return fetch(API_QUESTIONS)
//     .then((response) => response.json()
//     .then(quest => (response.ok ? Promise.resolve(quest) : Promise.reject(quest))),
//   );
// }
// export default resolveQuestions;
function resolveQuestion(token) {
  const fetchAPI = fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
    .then((resolve) => resolve.json());
  return fetchAPI;
}

export default resolveQuestion;
