import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Alert, Card, Form, Button } from 'react-bootstrap'
import { getCategories } from '../api.js'

export default function Home() {
  const navigate = useNavigate()
  const [categories, setCategories] = useState([])   // NEW
  const [category, setCategory] = useState('')       // NEW
  const [error, setError] = useState('')             // NEW
  const [difficulty, setDifficulty] = useState('')
  const [amount, setAmount] = useState(10)

  // NEW: load categories once when the screen first appears
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
    if (category) params.set('category', category)   // NEW
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
          <Form.Label>Number of questions: {amount}</Form.Label>
          <Form.Range min={5} max={20} step={5} value={amount} onChange={(e) => setAmount(e.target.value)} />
        </Form.Group>

        <Button type="submit" className="w-100">Start quiz</Button>
      </Form>
    </Card>
  )
}
/**import { getCategories } from '../api.js' loads your API function. ../ means “go up one folder”, because api.js is in src and this file is in src/pages.
useState([]) for categories starts with an empty list, which we fill when the data arrives. category holds the chosen one, and error holds a message if loading fails.
useEffect(() => { ... }, []) runs code at a certain moment, not on every redraw. The empty [] at the end means “run once, when the screen first appears”. Fetching data is the classic use for it.
new AbortController() creates a cancel button for the request. We pass its signal to fetch.
async function load() is needed because the effect function itself can’t be async, so we define an async function inside it and call it.
try { ... } catch (e) { ... } tries the code in try. If anything throws an error, JavaScript jumps to catch instead of crashing. This is the “handle errors properly” part of the assignment.
e.name !== 'AbortError' ignores the error that cancelling causes on purpose.
return () => controller.abort() is cleanup. If you leave the screen before the data arrives, the request is cancelled.
{error && <Alert ...>} shows the alert only if error is not empty. && means “if the left side is true, show the right side”.
categories.map((c) => (...)) turns each category into an <option>. .map goes through a list and builds something for each item.
key={c.id} gives each item a unique label so React can track them. React requires it for lists.
value={c.id} is what gets stored when chosen, and {c.name} is the text the user sees. */