export function decodeJWT() {
  const token = localStorage.getItem("a_token");
  return token
    ? JSON.parse(
        // Buffer.from(token.split(".")[1], "base64").toString()
        atob(token.split(".")[1])
      )
    : undefined;
}
