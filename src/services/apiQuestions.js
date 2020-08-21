const token = localStorage.getItem('token');

const API_QUESTIONS = `https://opentdb.com/api.php?amount=5&token=${token}`;

async function resolveQuestions() {
  return fetch(API_QUESTIONS)
    .then((response) => response.json()
    .then(quest => (response.ok ? Promise.resolve(quest) : Promise.reject(quest))),
  );
}
export default resolveQuestions;
