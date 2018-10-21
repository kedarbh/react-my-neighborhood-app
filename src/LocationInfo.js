import React from 'react'


class LocationInfo extends React.PureComponent {

    render() {
        const { info } = this.props;
        const displayName = `${info.name}`;

        return (
            <div>
                <div>
                    <h3>{displayName}</h3>
                </div>

                <p> {info.location.address} {info.location.city}</p>
                <p> {info.location.state} {info.location.postalCode}</p>
                <p> {info.location.country}</p>

            </div>
        );
    }
}

export default LocationInfo