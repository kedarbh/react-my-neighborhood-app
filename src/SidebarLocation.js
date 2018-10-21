import React from 'react';
import ReactMapGL from 'react-map-gl';


class SidebarLocation extends React.Component {

  getLocation = (location, index) => {
    return (
      <div className="item" onClick={() => this.eventHandler(location)} key={`location-${index}`}>
        <h3 className="title">{location.city}</h3>
        <div className="item-details">
          <p>2221 I St NW</p>
          <p>Washington DC</p>
          <p>(202) 507-8357</p>
        </div>
        <div className="listing-image">
          <img src={location.image} width="100%" alt="name of location" />
        </div>
      </div>
    )
  }

  eventHandler = (location) => {
    console.log(location);
    return (
      <ReactMapGL
        mapboxApiAccessToken={this.props.TOKEN} >
        this.props.eventHandler();
      </ReactMapGL>
    )

  }

  render() {
    return (
      <div className="location">
        <div className="heading">
          <h2>Our locations</h2>
        </div>
        <div id="listings" className="listings">
          {this.props.Location.map(this.getLocation)}
        </div>
      </div>
    );
  }
}

export default SidebarLocation