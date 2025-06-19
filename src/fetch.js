const API_ENDPOINT = "https://witzapi.de/api/joke";

export async function getAPI() {
  const response = await fetch(API_ENDPOINT);

  const body = await response.json();

  return body[0].text;
}
