const token = localStorage.getItem("a_token");
// const userInfo = JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());

export function getToken() {
  return localStorage.getItem("a_token");
}

export function getUserInfo(token) {
  try {
    const userInfo =  JSON.parse(window.atob(token.split('.')[1].replace('-', '+').replace('_', '/')));
    return userInfo
  } catch (e) {
    return null;
  }
}

