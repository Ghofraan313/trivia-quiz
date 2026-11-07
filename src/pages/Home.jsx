import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Alert, Card, Form, Button } from 'react-bootstrap'
import { getCategories } from '../api.js'

export default function Home() {
  const navigate = useNavigate()
  const [categories, setCategories] = useState([])
  const [category, setCategory] = useState('')
  const [error, setError] = useState('')
  const [difficulty, setDifficulty] = useState('')
  const [amount, setAmount] = useState(10)

  useEffect(() => {
    const controller = new AbortController()

    async function load() {
      try {
        const list = await getCategories(controller.signal)
        setCategories(list)
      } catch (e) {
        if (e.name !== 'AbortError') {
          setError('Categories could not load. You can still play with any category.')
        }
      }
    }

    load()
    return () => controller.abort()
  }, [])

  function handleSubmit(event) {
    event.preventDefault()
    const params = new URLSearchParams({ amount })
    if (category) params.set('category', category)
    if (difficulty) params.set('difficulty', difficulty)
    navigate(`/quiz?${params}`)
  }

  return (
    <Card body>
      <h1 className="h3">Choose your quiz</h1>
      {error && <Alert variant="warning">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="category">
          <Form.Label>Category</Form.Label>
          <Form.Select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Any category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="difficulty">
          <Form.Label>Difficulty</Form.Label>
          <Form.Select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
            <option value="">Any difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-4" controlId="amount">
          <Form.Label>Number of questions (1-20)</Form.Label>
          <Form.Control
            type="number"
            min={1}
            max={20}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </Form.Group>

        <Button type="submit" className="w-100">Start quiz</Button>
      </Form>
    </Card>
  )
}