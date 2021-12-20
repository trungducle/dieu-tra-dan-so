google.charts.load("current", { packages: ["bar"] });
google.charts.setOnLoadCallback(drawStuff);

$(window).resize(function () {
  drawStuff();
});

function drawStuff() {
  const data = new google.visualization.arrayToDataTable([
    ["Tỉnh/Thành phố", "Dân số"],
    ["Hà Nội", 446666],
    ["Lào Cai", 316666],
    ["Hồ Chí Minh", 12666],
    ["Đà Nẵng", 10666],
    ["Tuyên Quang", 36666],
    ["Hà Giang", 3666],
    ["Tuyên Quang", 36666],
    ["Tuyên Quang", 36666],
    ["Tuyên Quang", 36666],
    ["Tuyên Quang", 36666],
  ]);

  const options = {
    title: "Tỉnh/Thành phố",
    width: 550,
    height: 400,
    legend: { position: "none" },
    bars: "horizontal", // Required for Material Bar Charts.
    axes: {
      x: {
        0: { side: "top", label: "Dân số" }, // Top x-axis.
      },
    },
    bar: { groupWidth: "100%" },
    colors: ["#5b5bdc"],
  };

  const chart = new google.charts.Bar(document.getElementById("bar_top_x_div"));
  chart.draw(data, options);
}
