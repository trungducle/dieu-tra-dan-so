let sidebar = $(".sidebar");
let sidebarBtn = $(".sidebarBtn");

sidebarBtn.click(function () {
  sidebar.toggleClass("active");
});

const mainContent = $(".main-content");

$(document).ready(function () {
  mainContent.load('../Home/home.html');
});

$('li').click((e) => {
  const node1 = e.target.closest('.home');
  const node2 = e.target.closest('.accounts');
  const node3 = e.target.closest('.cities');
  const node4 = e.target.closest('.option');

  const node_selected = $('.isSelected');
  if (node1) {
    node_selected.removeClass('isSelected');
    node1.classList.add('isSelected');
    $.get("../Home/home.html", function (data) {
      mainContent.empty();
      mainContent.append(data);
    });
  } else if (node2) {
    node_selected.removeClass('isSelected');
    node2.classList.add('isSelected');
    $.get("../Home/account.html", function (data) {
      mainContent.empty();
      mainContent.append(data);
    });
    $.get("../Home/acManage.html", function (data) {
      $(".account-content").empty();
      $(".account-content").append(data);
    });
  }
  else if (node3) {
    node_selected.removeClass('isSelected');
    node3.classList.add('isSelected');
    $.get("../Home/dataDetails.html", function (data) {
      mainContent.empty();
      mainContent.append(data);
    });
    $.get("../Home/cities.html", function (data) {
      $(".data-content").empty();
      $(".data-content").append(data);
    });
  }
  else if (node4) {
    node_selected.removeClass('isSelected');
    node4.classList.add('isSelected');
    $.get("../Home/option.html", function (data) {
      mainContent.empty();
      mainContent.append(data);
    });
    $.get("../Home/acDetails.html", function (data) {
      $(".option-content").empty();
      $(".option-content").append(data);
    });
  }
});

