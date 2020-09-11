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
const apiKey = "at_uXcyYK1ISwX6fQmzAT7KLQhkEfhMQ";
const form = document.querySelector(".search-bar");

form.addEventListener("submit", searchIP);

async function searchIP(e) {
	e.preventDefault();
	//DOM Elelments
	const input = document.querySelector(".search-input");
	const searchButton = document.querySelector(".search-button");

	let ipAddress = input.value;
	const regex = /^(http(s?):\/\/)((www\.)+[a-zA-Z0-9\.\-\_])+(\.[a-zA-Z]{2,3})|[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}/;

	if (regex.test(ipAddress)) {
		const data = await fetch(
			`https://geo.ipify.org/api/v1?apiKey=${apiKey}&ipAddress=${ipAddress}`
		)
			.then((res) => res.json())
			.then((data) => data);

		const nCord = data.location.lat;
		const eCord = data.location.lng;

		paintMap(nCord, eCord);
		setTimeout(paintDOM(data), 1000);
	} else {
		searchButton.style.backgroundColor = "red";
		const searchBar = document.querySelector(".search-bar");
		searchBar.style.animation = "0.1s linear .1s 3 alternate slidein";
		setTimeout(() => {
			searchButton.style.backgroundColor = "black";
			searchBar.style.animation = "none";
		}, 3000);
	}
	input.value = "";
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
const seeIP = document.querySelector(".see-ip");
seeIP.addEventListener("click", locateMyIP);
async function locateMyIP(e) {
	e.preventDefault();
	const data = await fetch(
		`https://geo.ipify.org/api/v1?apiKey=${apiKey}&ipAddress=`
	)
		.then((res) => res.json())
		.then((data) => data);

	const nCord = data.location.lat;
	const eCord = data.location.lng;

	paintMap(nCord, eCord);
	setTimeout(paintDOM(data), 1000);
}
