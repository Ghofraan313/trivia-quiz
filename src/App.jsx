import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Quiz from './pages/Quiz.jsx'
import Results from './pages/Results.jsx'

export default function App() {
  return (
    <div className="container py-4">
      <nav className="mb-3">
        <Link to="/" className="me-3">Home</Link>
        <Link to="/quiz" className="me-3">Quiz</Link>
        <Link to="/results">Results</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </div>
  )
}