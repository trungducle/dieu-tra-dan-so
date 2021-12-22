import { decodeJWT } from "../../utils.js";

var sidebar = $(".sidebar");
var sidebarBtn = $(".sidebarBtn");
var mainContent = $(".main-content");
var profileName = $(".profile-name");
var userInfo = decodeJWT();

sidebarBtn.click(function () {
  sidebar.toggleClass("active");
});

$(document).ready(function () {
  mainContent.load("home.html");
  profileName.text(userInfo?.username);
});

$(".nav-links a").click((e) => {
  console.log(e.target);
  var node1 = e.target.closest("#home");
  var node2 = e.target.closest("#accounts");
  var node3 = e.target.closest("#cities");
  var node4 = e.target.closest("#option");

  var node_selected = $(".isSelected");
  if (node1) {
    node_selected.removeClass("isSelected");
    node1.classList.add("isSelected");
    $.get("home.html", function (data) {
      mainContent.empty();
      mainContent.append(data);
    });
  } else if (node2) {
    node_selected.removeClass("isSelected");
    node2.classList.add("isSelected");
    $.get("account.html", function (data) {
      mainContent.empty();
      mainContent.append(data);
    });
    $.get("acManage.html", function (data) {
      $(".account-content").empty();
      $(".account-content").append(data);
    });
  } else if (node3) {
    node_selected.removeClass("isSelected");
    node3.classList.add("isSelected");
    $.get("dataDetails.html", function (data) {
      mainContent.empty();
      mainContent.append(data);
    });
    $.get("cities.html", function (data) {
      $(".data-content").empty();
      $(".data-content").append(data);
    });
  } else if (node4) {
    node_selected.removeClass("isSelected");
    node4.classList.add("isSelected");
    $.get("option.html", function (data) {
      mainContent.empty();
      mainContent.append(data);
    });
    $.get("acDetails.html", function (data) {
      $(".option-content").empty();
      $(".option-content").append(data);
    });
  }
});
