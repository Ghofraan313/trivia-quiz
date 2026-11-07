import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Alert, Button, Spinner } from 'react-bootstrap'
import { getQuestions } from '../api.js'

export default function Quiz() {
  const [searchParams] = useSearchParams()
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    async function load() {
      setLoading(true)
      setError('')
      try {
        const list = await getQuestions(
          {
            amount: searchParams.get('amount') || 10,
            category: searchParams.get('category'),
            difficulty: searchParams.get('difficulty'),
          },
          controller.signal
        )
        setQuestions(list)
        setLoading(false)
      } catch (e) {
        if (e.name !== 'AbortError') {
          setError(e.message)
          setLoading(false)
        }
      }
    }

    load()
    return () => controller.abort()
  }, [searchParams, attempt])

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" />
        <p className="mt-3">Loading questions...</p>
      </div>
    )
  }

  if (error) {
    return (
      <Alert variant="danger">
        <p>{error}</p>
        <Button onClick={() => setAttempt(attempt + 1)}>Try again</Button>
      </Alert>
    )
  }

  const question = questions[0]

  return (
    <div>
      <h2 className="h5 mb-3">{question.question}</h2>
      {question.answers.map((answer) => (
        <Button key={answer} variant="outline-primary" className="d-block mb-2">
          {answer}
        </Button>
      ))}
    </div>
  )
}
/**const [searchParams] = useSearchParams() reads the settings from the URL (?amount=10&category=18). It returns a pair, and we only need the first item.
Four useState lines remember: the questions (a list, starting empty), whether we are loading (starting true), an error message, and a retry counter.
useEffect(..., [searchParams, attempt]) runs the code when the screen appears and again whenever searchParams or attempt changes. That is how the “Try again” button works: it adds 1 to attempt, which re-runs the fetch.
setLoading(true) and setError('') reset the screen at the start of each attempt, so an old error doesn’t stay visible.
searchParams.get('amount') || 10 reads the amount from the URL, and uses 10 if it is missing. || means “or”.
await getQuestions(...) pauses until the questions arrive. If anything throws, catch takes over and stores e.message, which is the text we wrote in api.js.
if (loading) { return (...) } returns early. While loading, the component shows only the spinner, and the code below doesn’t run yet.
if (error) { return (...) } does the same for errors, showing a red alert with a retry button.
onClick={() => setAttempt(attempt + 1)} means “when clicked, add 1 to attempt”.
const question = questions[0] takes the first question from the list. Lists start counting at 0.
question.answers.map(...) draws one button per answer. d-block mb-2 are Bootstrap classes that put each button on its own line with space below. */