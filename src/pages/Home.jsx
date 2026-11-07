import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Form, Button } from 'react-bootstrap'

export default function Home() {
  const navigate = useNavigate()
  const [difficulty, setDifficulty] = useState('')
  const [amount, setAmount] = useState(10)

  function handleSubmit(event) {
    event.preventDefault()
    const params = new URLSearchParams({ amount })
    if (difficulty) params.set('difficulty', difficulty)
    navigate(`/quiz?${params}`)
  }

  return (
    <Card body>
      <h1 className="h3">Choose your quiz</h1>
      <Form onSubmit={handleSubmit}>
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
/**Line by line:

import { useState } from 'react' loads
 React’s tool for remembering values. When
  a remembered value changes, React redraws
   the screen.
useNavigate gives you a function that switches screens from code, which we need after the form is submitted.
Card, Form, Button are ready-made Bootstrap components.
const navigate = useNavigate() stores that function so we can call navigate(...) later.
const [difficulty, setDifficulty] = useState('') creates a remembered value. difficulty is the current value, setDifficulty changes it, and '' is the starting value (nothing chosen). Never change difficulty directly. Always use setDifficulty, or React won’t redraw.
useState(10) does the same for the number of questions, starting at 10.
function handleSubmit(event) runs when the form is submitted.
event.preventDefault() stops the browser’s default behavior, which is reloading the page.
new URLSearchParams({ amount }) builds a query string such as amount=10. The { amount } is shorthand for { amount: amount }.
if (difficulty) params.set(...) adds the difficulty only if one was chosen, because an empty string counts as false.
navigate(/quiz?${params}) goes to the Quiz screen with the settings in the URL, for example /quiz?amount=10&difficulty=easy. The backticks let ${params} insert a value into the text.
<Card body> draws a Bootstrap box with padding.
onSubmit={handleSubmit} connects the form to the function above.
<Form.Group controlId="difficulty"> groups a label with its input. The controlId links them, so clicking the label focuses the input, which helps accessibility.
value={difficulty} makes the dropdown show the remembered value.
onChange={(e) => setDifficulty(e.target.value)} runs whenever the user picks something. e.target.value is what they picked, and we store it. This pattern is called a controlled input.
{amount} inside the label shows the current number, and it updates as the slider moves.
<Form.Range ... /> draws the slider, with its limits set by min, max and step.
w-100 is a Bootstrap class for 100% width. */