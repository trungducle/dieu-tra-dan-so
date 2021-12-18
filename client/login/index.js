$(document).ready(function () {
  $("#submit-btn button").click(function (e) {
    e.preventDefault();

    const username = $("#username input").val();
    const password = $("#password input").val();

    (async () => {
      const rawResponse = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username, password: password }),
      });
      const response = await rawResponse.json();

      if (response.error) {
        $(".login-error").text(response.error);
        setTimeout(function () {
          $(".login-error").remove();
        }, 3000);
      } else {
        localStorage.setItem("a_token", response.accessToken);
        window.location.href = "/home";
      }
    })();
  });
});
