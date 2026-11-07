import { Link, useLocation } from 'react-router-dom'

export default function Results() {
  const { state } = useLocation()

  if (!state) {
    return <p>No quiz played yet. <Link to="/">Start one</Link></p>
  }

  return <h1>{state.score} / {state.total}</h1>
}
