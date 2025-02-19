import React, { useState } from "react"
import { MarkerClusterer, Marker, GoogleMap, useLoadScript } from '@react-google-maps/api';
import img from './../../assets/img/search.png'

const posError = () => {
  if(navigator.permissions) {
    navigator.permissions.query({ name : 'geolocation' }).then(res => {
      if(res.state === 'denied') {
        alert('Enable location permission for this website in your browser settings.')
      } 
    })
  } else {
    alert("Unable to access your location. You can continue by submitting location manually.")
  }
}

// Script Tag
const Map = ({location}) => {
  const [curntLat, setCurntLat] = useState(0)
  const [curntLong, setCurntLong] = useState(0)

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyBuT1yUIY9uy6tpbb8Sg1UCGsMgCIxEx60" 
  })
  let area = []

  const showPosition = (position) => {
    let lat = position.coords.latitude
    let long = position.coords.longitude
    setCurntLong(long)
    setCurntLat(lat)
  }

  const getPosition = () => {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, posError);
    } else {
        alert("Sorry, Gelocation is not supported by this browser")
    }
  }

  if(Object.keys(location).length) {
    getPosition()
    const selectedLocation = location.selectedPin.split('-')[0]
    area.push(location[selectedLocation].find(ele => {
      if(ele.city === location.selectedPin.split('-')[1]) {
        return true
      }
      return false
    }))
    console.log(curntLat, '==curntLat')
    curntLat && area.push({city: 'Current Position', latitude: curntLat, longitude: curntLong})
  }

  const defaultProps = { 
    center: {
      lat: parseFloat(area[0]?.latitude) || 26.5041,
      lng: parseFloat(area[0]?.longitude) || 77.1025
    },
    zoom: area[0]?.longitude ? 11 : 5
  }
  console.log(area, '=============area')
  // Fit bounds function
  const renderMap = () => {
    return <div className="mt-3" >
      <GoogleMap
        zoom={ defaultProps.zoom }
        center={{
          lat: defaultProps.center.lat,
          lng: defaultProps.center.lng
        }}
        mapContainerStyle={{ 'height':'500px'}}
      >
        <MarkerClusterer >
          {
            () => area.length && area.map((center, key) => {
                return <Marker key={key}
                    onClick={() => 'MarkerShapeRect'}
                    position={{lat:parseFloat(center.latitude), lng:parseFloat(center.longitude)}}
                    title={center.city}
                    imagePath={img}
                    cursor="dddd"
                    zoomOnClick="3"
                  />
              })
            }
        </MarkerClusterer>
      </GoogleMap>
    </div>
  }

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>
  }

  return isLoaded ? renderMap() : <h1> loading.............!</h1>
}

export default Map