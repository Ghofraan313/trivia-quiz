import { Card, Button } from 'react-bootstrap'

export default function QuestionCard({ question, selected, onSelect }) {
  const answered = selected !== null

  function variantFor(answer) {
    if (!answered) return 'outline-primary'
    if (answer === question.correct) return 'success'
    if (answer === selected) return 'danger'
    return 'outline-secondary'
  }

  return (
    <Card body>
      <h2 className="h5 mb-3">{question.question}</h2>
      <div className="d-grid gap-2">
        {question.answers.map((answer) => (
          <Button
            key={answer}
            variant={variantFor(answer)}
            className="text-start"
            disabled={answered}
            onClick={() => onSelect(answer)}
          >
            {answer}
          </Button>
        ))}
      </div>
    </Card>
  )
}
/**{ question, selected, onSelect } are props, the inputs a component receives from its parent. This is how Quiz tells QuestionCard what to show. The component draws whatever it is given and owns no data itself.
const answered = selected !== null is true once an answer has been picked. null means “nothing picked yet”.
function variantFor(answer) chooses a Bootstrap button color for each answer. Before answering, all are blue outlines. After answering, the correct answer turns green (success), your wrong pick turns red (danger), and the rest turn grey. Each return ends the function immediately, so the checks run in order.
disabled={answered} locks all the buttons after you pick, so you can’t answer twice.
onClick={() => onSelect(answer)} calls the function the parent gave us and tells it which answer was clicked.
text-start left-aligns the text in the button, and d-grid gap-2 stacks the buttons full width with space between. */