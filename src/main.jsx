/*import { HashRouter } from 'react-router-dom' 
loads the router. It gives your app multiple “pages” and
 keeps the URL in sync, like /#/quiz.
import 'bootstrap/dist/css/bootstrap.min.css' loads 
Bootstrap’s styles for the whole app. This is the 
“style” library from the assignment.
<HashRouter> replaces <StrictMode>. The router has to
 wrap <App />, so every component inside can use routing.
I removed import './index.css'. Vite’s starter styles would
 fight with Bootstrap.
I also removed StrictMode. In development it runs some 
code twice, and the Open Trivia API only allows one 
request every 5 seconds, so it would give you errors.
 This is a trade-off, and you can mention it in your 
 report. */
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <HashRouter>
    <App />
  </HashRouter>,
)