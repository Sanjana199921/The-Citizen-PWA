const location = {
    latitude: null,
    longitude: null,
}

function setPosition(position) {
    location.latitude = position.coords.latitude;
    location.longitude = position.coords.longitude;
}

(function() {
  if (navigator.geolocation) {
    console.log(navigator.geolocation)
    navigator.geolocation.getCurrentPosition(setPosition);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
})();

export default location;