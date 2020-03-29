(function() {
	"use strict";

	// This function breaks the positive counts into 16 colors (0 - 15) to set the color of the states
	// based on the number of positive tests
	function setStateColors() {
		// Thanks to: https://gomakethings.com/converting-a-nodelist-to-an-array-with-vanilla-javascript/
		let stateDataSets = Array.from(document.querySelectorAll("[id$='map-data']"));
		let l = stateDataSets.length;

		// dataPositive is the number of positive tests
		let dataPositive = {};

		// segments is used to break the counts into uniform groups for coloring
		let segments = [];
		for (let i = 0; i < l; i++) {
			let el = stateDataSets[i];
			let dp = parseInt(el.getAttribute("data-positive"));
			dataPositive[el.id.replace("-map-data","")] = dp;
			segments.push(dp);
		}

		// Sort the segment array numericall
		segments.sort(function(a, b) { return a - b; });

		// Set up to color the states - colors range from 0-15
		let diffColors = 15;

		// Break the counts into segments
		let segmentLength = segments.length / diffColors;
		for (let dp in dataPositive) {

			// Use the segments to normalize the positive count between 0 and 15
			let p =  (16 - Math.round(segments.indexOf(dataPositive[dp]) / segmentLength)) * 16;
			let svgEl = document.getElementById(dp);
			if (svgEl !== null) {
				svgEl.setAttribute("fill","rgb(cc,cc,cc)".replace(/cc/g,p));
			}
		}

	}

	// Determine the dimensions of the detail boxes
	const nhStateData = document.getElementById("NH-map-data");
	nhStateData.classList.remove("hidden");
	const rect = nhStateData.getBoundingClientRect();
	nhStateData.classList.add("hidden");
	const stateDataHeight = rect.height;
	const stateDataWidth = rect.width;

	// Get the map
	const map = document.getElementById("svg-map");

	// Returns the element with the state's map data, or null if the mouse isn't over a state
	function getStateData(e) {
		let target = e.target;
		let stateId = target.getAttribute("id");
		if (stateId !== null && stateId !== "") {
			return document.getElementById(stateId + "-map-data");
		}
		return null;
	}

	// Hides the detail box after the mouse leaves
	function handleMouseOut(e) {
		let stateData = getStateData(e);
		if (stateData !== null) {
			stateData.classList.add("hidden");
		}
	}

	// Displays the detail box
	function handleMouseOver(e) {
		let stateData = getStateData(e);
		if (stateData !== null) {

			// Attach the mouseout handler to the state and allow it to fire only once
			e.target.addEventListener("mouseout", handleMouseOut, { once: true });

			// Ensure the detail box will be visible
			let innerWidth = window.innerWidth;
			let innerHeight = window.innerHeight;
			let left = e.pageX + 5; 
			if (innerWidth < e.clientX + stateDataWidth) {
				left -= stateDataWidth - 5;  
			}
			let top = e.pageY + 5;
			if (innerHeight < e.clientY + stateDataHeight) {
				top -= stateDataHeight - 5;
			}

			// Position the box
			stateData.style.left = left + "px";
			stateData.style.top = top + "px";

			// Display the box
			stateData.classList.remove("hidden");
		}
	}

	// Allow navigation to the states page on click of the state
	function handleClick(e) {
		let target = e.target;
		if (target.tagName.toLowerCase() === "path") {
			handleMouseOut(e);
			let stateId = target.getAttribute("id");
			if (stateId !== null && stateId !== "") {
				location.href = "/data/#"+stateId;
			}
		}
	}

	function init() {
		setStateColors();
		if (window.innerWidth > 400) {
			map.addEventListener("mouseover", handleMouseOver);
		}
		map.addEventListener("click", handleClick);
	}

	init();
} )();
