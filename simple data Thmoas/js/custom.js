//--- get elements for easier naming in the code
	let pieChart = document.querySelector('.pieChart');
	
//---
	window.onscroll = function() {onScrollChecks()};

function onScrollChecks() {
	if (window.pageYOffset >= pieChart.offsetTop) {
		let targetPercentage=65;
		document.querySelector('#timerPie').style.strokeDasharray=(targetPercentage*(Math.PI/100)*10)+" "+(Math.PI*10);
	} 
	else {
		document.querySelector('#timerPie').style.strokeDasharray="0 31.416";
	}
}
