import { decode } from 'he'

const BASE = 'https://opentdb.com'

export async function getCategories(signal) {
  const response = await fetch(`${BASE}/api_category.php`, { signal })
  if (!response.ok) {
    throw new Error('Could not load categories.')
  }
  const data = await response.json()
  return data.trivia_categories
}

export async function getQuestions({ amount, category, difficulty }, signal) {
  const params = new URLSearchParams({ amount, type: 'multiple' })
  if (category) params.set('category', category)
  if (difficulty) params.set('difficulty', difficulty)

  const response = await fetch(`${BASE}/api.php?${params}`, { signal })
  if (response.status === 429) {
    throw new Error('Too many requests. Wait 5 seconds and try again.')
  }
  if (!response.ok) {
    throw new Error('The quiz server returned an error.')
  }

  const data = await response.json()
  if (data.response_code === 5) {
    throw new Error('Too many requests. Wait 5 seconds and try again.')
  }
  if (data.response_code !== 0) {
    throw new Error('Not enough questions for that choice. Try another category or difficulty.')
  }

  return data.results.map((q) => {
    const correct = decode(q.correct_answer)
    const wrong = q.incorrect_answers.map((a) => decode(a))
    return {
      question: decode(q.question),
      correct: correct,
      answers: [correct, ...wrong].sort(() => Math.random() - 0.5),
    }
  })
}
/**import { decode } from 'he' loads the function that turns &quot; into " and so on. The { } are needed because decode is a named export of that library.
getQuestions({ amount, category, difficulty }, signal) takes one object with the settings. Writing the names in { } pulls out each value, which is called destructuring.
type: 'multiple' asks the API only for multiple-choice questions.
params.set(...) inside if adds the category and difficulty only when they were chosen.
response.status === 429 checks for the HTTP code “too many requests”. Open Trivia DB allows one request every 5 seconds per person.
data.response_code is the API’s own status number inside the data. 0 means success, 5 means rate limit, and 1 means not enough questions for your choice.
data.results.map((q) => { ... }) converts each question from the API’s format into the simpler format we want to use.
decode(q.correct_answer) cleans up the text. We do the same for the wrong answers with .map((a) => decode(a)).
[correct, ...wrong] builds one list from the correct answer plus all the wrong ones. The ... spreads a list’s items into the new list.
.sort(() => Math.random() - 0.5) shuffles the list. Math.random() gives a number between 0 and 1, so subtracting 0.5 randomly gives positive or negative results, which mixes the order. It’s not perfectly random, but it’s fine for a quiz.
return { question, correct, answers } gives each question three fields: the text, the right answer, and all four answers shuffled. */