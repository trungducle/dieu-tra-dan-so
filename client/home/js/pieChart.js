google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(drawChart);

$(window).resize(function () {
  drawChart();
});

function drawChart() {
  const data = google.visualization.arrayToDataTable([
    ["Task", "Hours per Day"],
    ["Work", 11],
    ["Eat", 2],
    ["Commute", 2],
    ["Watch TV", 2],
    ["Sleep", 7],
  ]);

  const options = {
    title: "My Daily Activities",
  };

  const chart = new google.visualization.PieChart(
    document.getElementById("piechart")
  );
  chart.draw(data, options);
}
