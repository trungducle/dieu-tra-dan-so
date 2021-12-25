import { getUserInfo, removeToken } from "../../utils.js";

$(() => {
  const { roleId } = getUserInfo();
  var navLinks = $("#navbar ul");
  var mainContent = $(".main-content");
  navLinks.append(
    $(`
      <li class="nav-link selected" id="home-nav">
        <a href="#">
          <i class="bx bx-home-alt"></i>
          <span class="link-name">Trang chủ</span>
        </a>
      </li>
    `)
  );
  navLinks.append(
    $(`
      <li class="nav-link" id="logout-nav">
        <a href="#">
          <i class="bx bx-home-alt"></i>
          <span class="link-name">Đăng xuất</span>
        </a>
      </li>
    `)
  );
  $("#logout-nav").click(() => {
    removeToken();
    location.href = "/login";
  });

  switch (roleId) {
    case 5:
      $("#home-nav").click(async (e) => {
        $(".nav-link.selected").removeClass("selected");
        e.target.closest(".nav-link").classList.add("selected");
        mainContent.load("b2home.html");
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
            <i class="bx bx-building-house"></i>
            <span class="link-name">Dữ liệu dân cư</span>
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
        $.get("acTableDetails.html", function (data) {
          $(".account-content").empty();
          $(".account-content").append(data);
        })
      });

      $("#data-entry-nav").click((e) => {
        $(".nav-link.selected").removeClass("selected");
        e.target.closest(".nav-link").classList.add("selected");
        mainContent.load("dataEntryManagement.html");
      })

      $("#residencies-nav").click((e) => {
        $(".nav-link.selected").removeClass("selected");
        e.target.closest(".nav-link").classList.add("selected");
        mainContent.load("dataDetails.html");
        $(".data-content").load("cities.html");
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
            <i class="bx bx-building-house"></i>
            <span class="link-name">Dữ liệu dân cư</span>
          </a>
        </li>
        <li class="nav-link" id="settings-nav">
          <a href="#">
            <i class="bx bx-cog"></i>
            <span class="link-name">Cài đặt</span>
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
        $.get("acTableDetails.html", function (data) {
          $(".account-content").empty();
          $(".account-content").append(data);
        })
      });

      $("#residencies-nav").click((e) => {
        $(".nav-link.selected").removeClass("selected");
        e.target.closest(".nav-link").classList.add("selected");
        mainContent.load("dataDetails.html");
        $(".data-content").load("cities.html");
      });

      $("#settings-nav").click((e) => {
        $(".nav-link.selected").removeClass("selected");
        e.target.closest(".nav-link").classList.add("selected");
        mainContent.load("option.html");
        $(".option-content").load("acDetails.html");
      });

      // navLinks.click((e) => {
      //   var homeNode = e.target.closest("#home");
      //   var accountsNode = e.target.closest("#accounts");
      //   var citiesNode = e.target.closest("#cities");
      //   var optionNode = e.target.closest("#option");
      //   var selectedNode = $(".nav-link.selected");

      //   if (homeNode) {
      //     selectedNode.removeClass("selected");
      //     homeNode.classList.add("selected");
      //     $.get("home.html", function (data) {
      //       mainContent.empty();
      //       mainContent.append(data);
      //     });
      //     $(".overview-boxes .box:nth-child(3) .number").text(
      //       localAmount.amount
      //     );
      //     $(".overview-boxes .box:nth-child(4) .number").text(
      //       totalAmount.amount
      //     );
      //   } else if (accountsNode) {
      //     selectedNode.removeClass("selected");
      //     accountsNode.classList.add("selected");
      //     $.get("account.html", function (data) {
      //       mainContent.empty();
      //       mainContent.append(data);
      //     });
      //     $.get("acManage.html", function (data) {
      //       $(".account-content").empty();
      //       $(".account-content").append(data);
      //     });
      //   } else if (citiesNode) {
      //     selectedNode.removeClass("selected");
      //     citiesNode.classList.add("selected");
      //     $.get("dataDetails.html", function (data) {
      //       mainContent.empty();
      //       mainContent.append(data);
      //     });
      //     $.get("cities.html", function (data) {
      //       $(".data-content").empty();
      //       $(".data-content").append(data);
      //     });
      //   } else if (optionNode) {
      //     selectedNode.removeClass("selected");
      //     optionNode.classList.add("selected");
      //     $.get("option.html", function (data) {
      //       mainContent.empty();
      //       mainContent.append(data);
      //     });
      //     $.get("acDetails.html", function (data) {
      //       $(".option-content").empty();
      //       $(".option-content").append(data);
      //     });
      //   }
      // });
      break;
    default:
      break;
  }
});
