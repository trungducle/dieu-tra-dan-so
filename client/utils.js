export function getToken() {
  return localStorage.getItem("a_token");
}

export function getUserInfo() {
  try {
    const token = getToken();
    const userInfo = JSON.parse(
      window.atob(token.split(".")[1].replace("-", "+").replace("_", "/"))
    );
    return userInfo;
  } catch (e) {
    return null;
  }
}

export function removeToken() {
  localStorage.removeItem("a_token");
}

export const customFetch = {
  get: async (path) => {
    try {
      const rawResult = await fetch(`http://localhost:8000${path}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      return rawResult.json();
    } catch (err) {
      return err;
    }
  },
  post: async (path, body, includeToken = true) => {
    try {
      const rawResult = await fetch(`http://localhost:8000${path}`, {
        method: "POST",
        headers: includeToken
          ? {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${getToken()}`,
            }
          : {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
        body: JSON.stringify(body),
      });

      return rawResult.json();
    } catch (err) {
      return err;
    }
  },
  delete: async (path) => {
    try {
      const rawResult = await fetch(`http://localhost:8000${path}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      return rawResult.json();
    } catch (err) {
      return err;
    }
  },
};
