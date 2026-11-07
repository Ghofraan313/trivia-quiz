import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Alert, Button, ProgressBar, Spinner } from 'react-bootstrap'
import { getQuestions } from '../api.js'
import QuestionCard from '../components/QuestionCard.jsx'

export default function Quiz() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [attempt, setAttempt] = useState(0)

  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [review, setReview] = useState([])

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
        <Button className="me-2" onClick={() => setAttempt(attempt + 1)}>Try again</Button>
        <Button variant="outline-secondary" onClick={() => navigate('/')}>Back to start</Button>
      </Alert>
    )
  }

  const question = questions[index]
  const isLast = index === questions.length - 1
  const score = review.filter((r) => r.picked === r.correct).length

  function handleSelect(answer) {
    setSelected(answer)
    setReview([...review, { question: question.question, picked: answer, correct: question.correct }])
  }

  function handleNext() {
    if (isLast) {
      navigate('/results', { state: { score, total: questions.length, review } })
    } else {
      setIndex(index + 1)
      setSelected(null)
    }
  }

  return (
    <div>
      <div className="d-flex justify-content-between mb-1">
        <span>Question {index + 1} of {questions.length}</span>
        <span>Score: {score}</span>
      </div>
      <ProgressBar now={(index / questions.length) * 100} className="mb-3" />
      <QuestionCard question={question} selected={selected} onSelect={handleSelect} />
      {selected !== null && (
        <Button className="mt-3 w-100" onClick={handleNext}>
          {isLast ? 'See results' : 'Next question'}
        </Button>
      )}
    </div>
  )
}
