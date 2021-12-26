import { getUserInfo, removeToken } from "../../utils.js";

$(() => {
  const { roleId } = getUserInfo();
  var mainContent = $(".main-content");

  $("#logout-nav").click(() => {
    removeToken();
    location.href = "/login";
  });

  switch (roleId) {
    case 5:
      $("#home-nav").click(async (e) => {
        $(".nav-link.selected").removeClass("selected");
        e.target.closest(".nav-link").classList.add("selected");
        mainContent.load("dataEntry.html");
      });
      break;
    case 4:
      $(`
        <li class="nav-link" id="accounts-nav">
          <a href="#">
            <i class="bx bxs-user-account"></i>
            <span class="link-name">Tài khoản</span>
          </a>
        </li>
        <li class="nav-link" id="data-entry-nav">
          <a href="#">
            <i class="bx bxs-data"></i>
            <span class="link-name">Quản lý nhập liệu</span>
          </a>
        </li>
        <li class="nav-link" id="residencies-nav">
          <a href="#">
            <i class="bx bxs-pie-chart-alt-2"></i>
            <span class="link-name">Phân tích dữ liệu</span>
          </a>
        </li>
      `).insertAfter("#home-nav");

      $("#home-nav").click(async (e) => {
        $(".nav-link.selected").removeClass("selected");
        e.target.closest(".nav-link").classList.add("selected");
        mainContent.load("home.html");
      });

      $("#accounts-nav").click((e) => {
        $(".nav-link.selected").removeClass("selected");
        e.target.closest(".nav-link").classList.add("selected");
        mainContent.load("account.html");
      });

      $("#data-entry-nav").click((e) => {
        $(".nav-link.selected").removeClass("selected");
        e.target.closest(".nav-link").classList.add("selected");
        mainContent.load("dataEntryManagement.html");
      })

      $("#residencies-nav").click((e) => {
        $(".nav-link.selected").removeClass("selected");
        e.target.closest(".nav-link").classList.add("selected");
        mainContent.load("dataAnalytic.html");
      });
      break;
    case 3:
    case 2:
    case 1:
      $(`
        <li class="nav-link" id="accounts-nav">
          <a href="#">
            <i class="bx bxs-user-account"></i>
            <span class="link-name">Tài khoản</span>
          </a>
        </li>
        <li class="nav-link" id="residencies-nav">
          <a href="#">
            <i class="bx bxs-pie-chart-alt-2"></i>
            <span class="link-name">Phân tích dữ liệu</span>
          </a>
        </li>
      `).insertAfter("#home-nav");

      $("#home-nav").click(async (e) => {
        $(".nav-link.selected").removeClass("selected");
        e.target.closest(".nav-link").classList.add("selected");
        mainContent.load("home.html");
      });

      $("#accounts-nav").click((e) => {
        $(".nav-link.selected").removeClass("selected");
        e.target.closest(".nav-link").classList.add("selected");
        mainContent.load("account.html");
        // $(".account-content").load("acTableDetails.html");
        $.get("acTableDetails.html", (data) => {
          $(".account-content").empty();
          $(".account-content").append(data);
        })
      });

      $("#residencies-nav").click((e) => {
        $(".nav-link.selected").removeClass("selected");
        e.target.closest(".nav-link").classList.add("selected");
        mainContent.load("dataAnalytic.html");
      });

      $("#settings-nav").click((e) => {
        $(".nav-link.selected").removeClass("selected");
        e.target.closest(".nav-link").classList.add("selected");
        mainContent.load("option.html");
        // $(".option-content").load("acDetails.html");
        $.get("acDetails.html", (data) => {
          $(".option-content").empty();
          $(".option-content").append(data);
        })
      });

      break;
    default:
      break;
  }
});
