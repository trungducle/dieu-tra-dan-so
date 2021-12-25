import { checkPrivileges } from "../../apiCalls.js";
import { getUserInfo } from "../../utils.js";

const { roleId, username, roleName } = getUserInfo();

$(async () => {
  var sidebar = $("#sidebar");
  var sidebarBtn = $(".sidebarBtn");
  var mainContent = $(".main-content");
  $(".profile-name").text(`${username} - ${roleName}`);
  sidebarBtn.click(() => {
    sidebar.toggleClass("active");
  });

  try {
    if (roleId === 5) {
      const privStatus = await checkPrivileges();
      if (privStatus.isPrivLocked) {
        mainContent.load("privLocked.html");
      } else {
        mainContent.load("b2home.html");
      }
    } else {
      mainContent.load("home.html");
    }
  } catch (err) {
    console.log(err);
  }
});
