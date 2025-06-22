const API_ENDPOINT = "https://witzapi.de/api/joke";

export async function getAPI(category) {
  let url = API_ENDPOINT;

  if (category) {
    url += `?category=${category}`;
  }

  const response = await fetch(url);
  const body = await response.json();

  return body[0].text;
}
