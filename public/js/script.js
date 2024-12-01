const socket=io();

console.log("i am js");

//checking the browser have the feature of location featurer is avalible or not and also a pop up come in screen maps is showing
//Here in navigator.geolocation.watchpostins is a function with the help of it we pass 3 things-:
//1-we send longitude and latitude of a person top socket using socket.emit
//2-we check is there any error or not
//3-we enabled high accuracy and after every 5 second it will send again the longitude and latitude 
if(navigator.geolocation){
    navigator.geolocation.watchPosition(
    (position)=>{
        const {latitude,longitude}=position.coords;
        socket.emit("send-location",{latitude,longitude})
    },
    (error)=>{
      console.error(error);
        
    },
    {
        enableHighAccuracy:true,
        timeout:5000,
        maximumAge:0
    }

)
}

//Leaflet gives us the specific things like

const map=L.map("map").setView([0,0],10);

// we need a tile where our map will show for that we use openstreetmap , where it show tile of the map  
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:"slog solutions",
}).addTo(map);

// showing the marker icon in the map 
const marker={}
socket.on("receive-location",(data)=>{
    const {id,latitude,longitude}=data;
    map.setView([latitude,longitude])
    if(marker[id]){
        marker[id].setLatLnf([latitude,longitude]);
    }else{
        marker[id]=L.marker([latitude,longitude]).addTo(map)
    }
})

//closing the location of other person
socket.on("user-disconnet",(id)=>{
    if(marker[id]){
        map.removeLayer(marker[id]);
        delete marker[id]
    }
})