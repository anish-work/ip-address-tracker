var myMap = L.map("map", { zoomControl: false }).setView([28.7041, 77.1025], 2);
L.control
	.zoom({
		position: "bottomleft",
	})
	.addTo(myMap);
L.tileLayer(
	"https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYW5pc2hzYXhlbmEiLCJhIjoiY2tlc3J1cGgyMWV4NjJ3b2Vkeml1cnQwZCJ9.5JF6rKnslEOR23129gOYyQ",
	{
		attribution:
			'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		maxZoom: 18,

		id: "mapbox/streets-v11",
		tileSize: 512,
		zoomOffset: -1,
		accessToken: "your.mapbox.access.token",
	}
).addTo(myMap);

var myIcon = L.icon({
	iconUrl: "./assets/images/icon-location.svg",
	iconSize: [30],
	iconAnchor: [22, 94],
	popupAnchor: [-3, -76],
	shadowSize: [68, 95],
	shadowAnchor: [22, 94],
});

const form = document.querySelector(".search-bar");

form.addEventListener("submit", searchIP);

async function searchIP(e) {
	e.preventDefault();
	//DOM Elelments
	const input = document.querySelector(".search-input");

	const apiKey = "at_uXcyYK1ISwX6fQmzAT7KLQhkEfhMQ";

	let ipAddress = input.value;
	const data = await fetch(
		`https://geo.ipify.org/api/v1?apiKey=${apiKey}&ipAddress=${ipAddress}`
	)
		.then((res) => res.json())
		.then((data) => data);

	const nCord = data.location.lat;
	const eCord = data.location.lng;

	paintMap(nCord, eCord);

	setTimeout(paintDOM(data), 1000);
}
function paintMap(n, e) {
	myMap.setView([n, e], 13);
	L.marker([n, e], { icon: myIcon }).addTo(myMap);
}
function paintDOM(data) {
	const ipHolder = document.querySelector("#ip-holder");
	const locationHolder = document.querySelector("#location-holder");
	const timeZoneHolder = document.querySelector("#timezone-holder");
	const ispHolder = document.querySelector("#isp-holder");

	ipHolder.textContent = data.ip;
	locationHolder.textContent = `${data.location.city}, ${data.location.region}, ${data.location.country}`;
	timeZoneHolder.textContent = `GMT ${data.location.timezone} `;
	ispHolder.textContent = `${data.isp.split(" ")[0]} ${data.isp.split(" ")[1]}`;
}

function animateButton() {}
