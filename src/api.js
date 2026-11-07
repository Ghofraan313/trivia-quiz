const BASE = 'https://opentdb.com'

export async function getCategories(signal) {
  const response = await fetch(`${BASE}/api_category.php`, { signal })
  if (!response.ok) {
    throw new Error('Could not load categories.')
  }
  const data = await response.json()
  return data.trivia_categories
}
/**const BASE = ... stores the API’s address once, so we don’t repeat it.
export async function getCategories(signal) defines a function other files can import. async means it does slow work (waiting for the internet) and can use await inside.
fetch(url, { signal }) sends a request to the address. await pauses this function until the answer arrives, without freezing the page. The signal lets us cancel the request later.
response.ok is true when the server answered successfully. If it’s not, we throw new Error(...), which jumps out of the function with a message. The screen will catch it.
await response.json() turns the answer’s text into a JavaScript object. This also takes a moment, so it needs await.
return data.trivia_categories hands back just the list we need. The API puts it under that name. */