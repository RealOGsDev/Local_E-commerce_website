var lat2, lon2;
const successCallback = async (position) => {
  lat2 = await position.coords.latitude;
  lon2 = await position.coords.longitude;
  console.log(position);
};
const errorCallback = (error) => {
  console.log(error);
};
navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

export {lat2, lon2}