import React, { Component } from 'react';
import { DebounceInput } from 'react-debounce-input'

class Sidebar extends Component {

  render() {
    const { query, updateQuery, error, venues, getLocation, closeNav } = this.props;

    return (
      <div id="location" className="location">
      <span className="closebtn" onClick={closeNav}>&times;</span>
        <div className="top-bar">
          <h2 className="heading">Food Lands</h2>
          <div className="search">
            <DebounceInput
              minLength={2}
              debounceTimeout={300}
              placeholder="Search by name"
              onChange={(event) => updateQuery(event.target.value)}
            />
          </div>
        </div>

        <div id="listings" className="listings">
          {!error && venues.map(getLocation)}
          {error &&
            <div className="error-message">
              <p>Sorry no results found. Your search '<b>{query}</b>' did not match.</p>
              <p>Venue List is obtained using Foursquare API</p>
            </div>
          }
        </div>
      </div>
    );
  }
}

export default Sidebar;