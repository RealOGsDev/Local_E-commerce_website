
// const {
//     Kuzzle,
//     WebSocket
//   } = require('kuzzle-sdk');
//   const kuzzle = new Kuzzle(new WebSocket('kuzzle'));
//   const layout = {
//     lat: 12.9085929,
//     lon: 77.5504666
//   };
//   // Create a filter that defines the circular area around Layout
//   const filter = {
//     geoDistance: {
//       location: layout,
//       distance: '3km'
//     }
//   };
//   // Create the user's location: they are inside the circular area
//   const currentLocation = {
//     firstName: 'Keshab',
//     lastName: 'Kataruka',
//     location: layout
//   };
//   const near = {
//     lat: 12.9085935,
//     lon: 77.5504660
//   };
//   const newLocation = {location: near};
//   const run = async () => {
//     const callback = notification => {
//       if (notification.scope === 'out') {
//         console.log('User has left Big Ben');
//         kuzzle.disconnect();
//       }
//     };
//     try {
//       await kuzzle.connect();
//       /* Create a subscription that triggers a notification
//       when a user enters the circular area */
//       await kuzzle.realtime.subscribe(
//         'myindex',
//         'mycollection',
//         filter,
//         callback
//       );
//       // Create the user's location inside the circular area
//       await kuzzle.document.create(
//         'myindex',
//         'mycollection',
//         currentLocation,
//         'keshab_kataruka'
//       );
//       // Update the user's location: now they are outside the circular area
//       await kuzzle.document.update(
//         'myindex',
//         'mycollection',
//         'keshab_kataruka',
//         newLocation
//       );
//     } catch (error) {
//       console.error(error.message);
//     }
//   };
//   run();




var map;
var mapcanvas;
let coordinates=[]

function InitMap()
{
  var location=new google.maps.LatLng(12.9085929,77.5504666);
  mapOptions={
    zoom:12,
    center:location,
    mapTypeId:google.maps.MapTypeId.RoadMap
  }
  map=new google.maps.Map(document.getElementById('map-canvas'),mapOptions)
  var all_overlays=[];
  var selectedShape;
  var drawingmanager=new google.maps.drawing.DrawingManager({
    drawingControlOptions:{
position: google.maps.Controlposition.TOP_CENTER,
drawingModes:[
  google.maps.drawing.OverlayType.POLYGON,
  google.maps.drawing.OverlayType.MARKER,
  google.maps.drawing.OverlayType.CIRCLE,
  google.maps.drawing.OverlayType.RECTANGLE,
]
    },
    markerOptions:{

    },
    circleOptions:{
      fillColor:'#ffff00',
      fillOpacity:0.2,
      strokeWeight:3,
      clickable:true,
      editable:true
    },
    rectangleOptions:{
      fillColor:'#ffff00',
      fillOpacity:0.2,
      strokeWeight:3,
      clickable:true,
      editable:true
    },
    polygonOptions:{
      clickable:true,
      draggable: false,
      editable:true,
      fillColor:'#ADFF2F',
      fillOpacity:0.5
    }


    
  })
  drawingManager.setMap(map)
  google.maps.event.addEventListener(drawingManager,'polygoncomplete',function(event){
    event.getPath().getLength();
    google.maps.event.addEventListener(event,'dragend',getPolygonCoords(event));

  })
}