import { useEffect } from 'react'
import { Link, Navigate, useLocation } from 'react-router-dom'
import { Button, Card, ListGroup } from 'react-bootstrap'
import confetti from 'canvas-confetti'

export default function Results() {
  const { state } = useLocation()

  useEffect(() => {
    if (state && state.score / state.total >= 0.7) {
      confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } })
    }
  }, [state])

  if (!state) {
    return <Navigate to="/" replace />
  }

  const { score, total, review } = state
  const wrong = review.filter((r) => r.picked !== r.correct)

  return (
    <div>
      <Card body className="text-center mb-4">
        <h1 className="h3">Quiz finished</h1>
        <p className="display-4 mb-3">{score} / {total}</p>
        <Button as={Link} to="/">Play again</Button>
      </Card>

      {wrong.length > 0 && (
        <div>
          <h2 className="h5">Review your mistakes</h2>
          <ListGroup>
            {wrong.map((r) => (
              <ListGroup.Item key={r.question}>
                <div className="fw-semibold">{r.question}</div>
                <div className="text-danger">Your answer: {r.picked}</div>
                <div className="text-success">Correct answer: {r.correct}</div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      )}
    </div>
  )
}