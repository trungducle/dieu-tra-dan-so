const proxy = "http://localhost:8000";

export async function login(credentials) {
  const rawResponse = await fetch(`${proxy}/auth/login`, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  return rawResponse.json();
}
