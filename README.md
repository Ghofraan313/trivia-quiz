# Trivia Quiz

A quiz app built with React. Choose a category, difficulty and number of
questions, answer them one at a time, and review your mistakes at the end.
Questions come from the [Open Trivia DB](https://opentdb.com/) API.

Live app: https://YOUR-USERNAME.github.io/trivia-quiz/

## Run locally

1. Install Node.js (version 18 or newer)
2. Clone the repository and open the folder in a terminal
3. Run `npm install`
4. Run `npm run dev` and open the address shown in the terminal

## Deploy to GitHub Pages

Run `npm run deploy`. In the repository settings under Pages, choose the
`gh-pages` branch as the source.

## Screens

- Home: choose category, difficulty and number of questions
- Quiz: answer the questions one at a time, with a progress bar and score
- Results: final score, confetti for good scores, and a list of your mistakes

## Libraries

- react-router-dom: navigation between the three screens
- react-bootstrap and bootstrap: styling and layout
- canvas-confetti: confetti effect for high scores
- he: decodes HTML characters in the API text
- gh-pages: deployment