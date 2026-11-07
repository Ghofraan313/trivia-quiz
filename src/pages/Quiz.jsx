import { useLocation } from 'react-router-dom'

export default function Quiz() {
  const location = useLocation()
  return <p>Settings: {location.search}</p>
}