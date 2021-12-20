import { login } from "../apiCalls.js";

$(document).ready(() => {
  $("#submit-btn button").click(async (e) => {
    e.preventDefault();

    const username = $("#username input").val();
    const password = $("#password input").val();

    try {
      const response = await login({ username, password });
      if (response.error) {
        $(".login-error").text(response.error);
        setTimeout(() => {
          $(".login-error").text("");
        }, 3000);
      } else {
        localStorage.setItem("a_token", response.accessToken);
        window.location.href = "/home";
      }
    } catch (err) {
      console.log(err);
    }
  });
});
