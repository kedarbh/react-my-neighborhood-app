import React, { Component } from 'react';
import ReactMapGL, { Marker, Popup, FlyToInterpolator } from 'react-map-gl';
import './App.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import LocationPin from './LocationPin';
import LocationInfo from './LocationInfo';
// import SidebarLocation from './SidebarLocation';
// import Location from './data/Location.json';

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
    venues: []
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
    // console.log(location.location)
    const latitude = location.location.lat;
    const longitude = location.location.lng;
    return (
      <Marker key={`marker-${index}`}
        longitude={longitude}
        latitude={latitude}>
        <LocationPin size={32} onClick={() => this.setState({ popupInfo: location })} />
      </Marker>
    );
  }

  locationPopupHandler = () => {
    const { popupInfo } = this.state;
    // console.log(popupInfo);

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
        {/* TODO: add image later */}
        {/* <div className="listing-image">
          <img src={location.image} width="100%" alt="name of location" />
        </div> */}
      </div>
    )
  }

  getVenue = () => {
    fetch(`${api}/venues/search?near=dallas&radius=1000&client_id=${clientId}&client_secret=${clientSecret}&v=${version}&query=food`)
      .then(response => response.json())
      .then(data => {
        // console.log(data.response.venues)
        this.setState({ venues: data.response.venues })
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
    if (query) {

    }
  }
  render() {
    const { query, venues } = this.state;

    return (
      <div className="app">
        <div className="sidebar">
          <div className="location">
            <div className="heading">
              <h2>Food Lands</h2>
            </div>
            <div className = "search">
              <input
                type="text"
                role="search"
                aria-label="search"
                placeholder="Search Here ..."
                tabIndex="0"
                className="search-field"
                value={query}
                onChange={event => this.updateQuery(event.target.value)}
              />
            </div>

            <div id="listings" className="listings">
              {venues.map(this.getLocation)}
            </div>
          </div>


        </div>
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
