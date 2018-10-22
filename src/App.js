import React, { Component } from 'react';
import ReactMapGL, { Marker, Popup, FlyToInterpolator } from 'react-map-gl';
import './App.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import LocationPin from './LocationPin';
import LocationInfo from './LocationInfo';
import Sidebar from './Components/Sidebar/Sidebar'
import escapeRegExp from 'escape-string-regexp';

//mapbox API credentials
const TOKEN = "pk.eyJ1Ijoia2VkYXJiaCIsImEiOiJjamwxNTJic2kxODR1M3ZyMDc0ZXZqcjllIn0.SQKrRKvScIPoSyzWrK-zNg";

//foursquare API credentials
const api = 'https://api.foursquare.com/v2',
  clientId = 'YGGH1TOCKU0AC113VMQNP3HNNBC0UANTXBOJINROZP0CETZG',
  clientSecret = 'BPM4S5I0J1WVQMMX5APZV0P5JIK3DQ3FUHSIJWMSN5PBZZSE',
  version = '20181010'


class App extends Component {
  state = {
    viewport: {
      //make map appear on full viewport available
      width: window.innerWidth,
      height: window.innerHeight,
      latitude: 32.781460,
      longitude: -96.802519,
      zoom: 14
    },
    popupInfo: null,
    query: '',
    venues: [],
    error: false,
    initialLocations: []
  };

  componentDidMount() {
    this.getVenue();
  }

  onViewportChange = viewport => this.setState({
    viewport: { ...this.state.viewport, ...viewport }
  });

  goToViewport = (longitude, latitude) => {
    this.onViewportChange({
      longitude: longitude,
      latitude: latitude,
      zoom: 16,
      transitionInterpolator: new FlyToInterpolator(),
      transitionDuration: 1000
    });
  };

  locationMarkerHandler = (location, index) => {
    const latitude = location.location.lat;
    const longitude = location.location.lng;
    return (
      <Marker key={`marker-${index}`}
        longitude={longitude}
        latitude={latitude}
        offsetLeft={-17}
        offsetTop={-10}>
        <LocationPin size={32} onClick={() => this.setState({ popupInfo: location })} />
      </Marker>
    );
  }

  locationPopupHandler = () => {
    const { popupInfo } = this.state;

    return popupInfo && (
      <Popup tipSize={5}
        anchor="top"
        longitude={popupInfo.location.lng}
        latitude={popupInfo.location.lat}
        onClose={() => this.setState({ popupInfo: null })} >
        <LocationInfo info={popupInfo} />
      </Popup>
    )
  }

  getLocation = (location, index) => {
    return (
      <div className="item" onClick={() => this.eventHandler(location)} key={`location-${index}`}>
        <h3 className="title">{location.name}</h3>
        <div className="item-details">
          <p> {location.location.address} {location.location.city}</p>
          <p> {location.location.state} {location.location.postalCode}</p>
          <p> {location.location.country}</p>
        </div>
      </div>
    )
  }

  getVenue = () => {
    fetch(`${api}/venues/search?near=dallas&radius=1000&client_id=${clientId}&client_secret=${clientSecret}&v=${version}&query=food`)
      .then(response => response.json())
      .then(data => {
        this.setState({ venues: data.response.venues })
        this.setState({ initialLocations: data.response.venues })
      })
      .catch(err => {
        if (err) {
          console.log("Error: ", err);
        }
      })
  }

  eventHandler = (location) => {
    this.setState({ popupInfo: location });
    this.goToViewport(location.location.lng, location.location.lat);
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() })

    if (query) {
      this.queryLocation(query)
    }
    else if (query === '') {
      this.setState({ venues: this.state.initialLocations, error: false })
    }

  }

  queryLocation = (query) => {
    const match = new RegExp(escapeRegExp(query), 'i');
    let filteredLocation = this.state.venues.filter(venue => match.test(venue.name))
    if (filteredLocation.length > 0) {
      this.setState({ venues: filteredLocation })
    } else {
      this.setState({ venues: [], error: true })
    }
  }

  //open navigation menu

  openNav = () => {
    function changeSize(x){
      if(x.matches) {
        document.getElementById('location').style.width = "50%";
      } else {
        document.getElementById('location').style.width = "30%";
      }
    }

    let x = window.matchMedia("(max-width: 600px)")
    changeSize(x)
    x.addListener(changeSize)

    document.getElementById('openbtn').style.display = "none";
  }
  closeNav = () => {
    document.getElementById('location').style.width = "0";
    document.getElementById('openbtn').style.display = "block";
  }

  render() {
    const { query, venues, error } = this.state;

    return (
      <div className="app">
        <aside id="sidebar" className="sidebar">
          <span id="openbtn" className="openbtn" onClick={this.openNav}>&#9776;</span>
          <Sidebar query={query}
            error={error}
            venues={venues}
            updateQuery={this.updateQuery}
            getLocation={this.getLocation}
            closeNav={this.closeNav}
          />
        </aside>
        <div className="map">
          <ReactMapGL
            {...this.state.viewport}
            onViewportChange={this.onViewportChange}
            mapStyle="mapbox://styles/mapbox/streets-v9"
            mapboxApiAccessToken={TOKEN}
          >
            {venues.map(this.locationMarkerHandler)}
            {this.locationPopupHandler()}
          </ReactMapGL>
        </div>
      </div>

    );
  }
}

export default App;