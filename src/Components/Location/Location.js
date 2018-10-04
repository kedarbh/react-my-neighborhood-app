import React from 'react'

class Location extends React.Component {
    render() {
        return (
            <div className="location">
                <div className="location-name">
                    <h2>location Name</h2>
                </div>

                <div className="location-info">
                    <div className="location-rating">4.5</div>
                    <div className="location-address">123 dummy way, Irving</div>
                    <div className="location-type">Coffee Shop</div>
                </div>
            </div>
        )
    }
}
export default Location