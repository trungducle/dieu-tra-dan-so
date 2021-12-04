google.charts.load('current', {'packages':['bar']});
      google.charts.setOnLoadCallback(drawStuff);

function drawStuff() {
var data = new google.visualization.arrayToDataTable([
    ['Move', 'Percentage'],
    ["King's pawn (e4)", 44],
    ["Queen's pawn (d4)", 31],
    ["Knight to King 3 (Nf3)", 12],
    ["Queen's bishop pawn (c4)", 10],
    ["Queen's pawn (d4)", 31],
    ["Knight to King 3 (Nf3)", 12],
    ["Queen's bishop pawn (c4)", 10],
    ["Queen's pawn (d4)", 31],
    ["Knight to King 3 (Nf3)", 12],
    ["Queen's bishop pawn (c4)", 10],
    ['Other', 3]
    
]);

var options = {
    width: 800,
    height: 400,
    legend: { position: 'none' },
    chart: {
      title: 'Chess opening moves',
      subtitle: 'popularity by percentage' },
    axes: {
      x: {
        0: { side: 'top', label: 'White to move'} // Top x-axis.
      }
    },
    bar: { groupWidth: "50%" },
    colors: ['#5b5bdc']
};

var chart = new google.charts.Bar(document.getElementById('column_top_x_div'));
// Convert the Classic options to Material options.
chart.draw(data, google.charts.Bar.convertOptions(options));
};