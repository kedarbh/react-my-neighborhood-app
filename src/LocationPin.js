import React from 'react'

const icon = `M16,.8a9.45,9.45,0,0,0-9.5,9.4c0,3,1.78,5.3,3.64,7.39,3.31,3.72,5,10.46,5.6,13.41a.27.27,0,0,0,.28.2.26.26,0,0,0,.27-.21c.59-2.95,2.26-9.68,5.57-13.4,1.86-2.09,3.64-4.39,3.64-7.39A9.45,9.45,0,0,0,16,.8ZM16,14a4.7,4.7,0,1,1,4.75-4.7A4.73,4.73,0,0,1,16,14Z`;

const pinStyle = {
    cursor: 'pointer',
    fill:'red'
};

class LocationPin extends React.PureComponent {
    render() {
        const {size = 32, onClick} = this.props;
        return (
            <svg height = { size }
                viewBox = '0 0 32 32'
                style = {{ ...pinStyle, translate: `translate(${-size/2}px,${-size}px)`}}
                onClick = {onClick} >
                <path d = {icon} />
            </svg>
        );
    }
}

export default LocationPin