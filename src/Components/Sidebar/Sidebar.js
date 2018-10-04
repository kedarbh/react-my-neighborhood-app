import React from 'react'
import Location from '../Location/Location'

class Sidebar extends React.Component {
    render() {
        return (
            <div className="sidebar">
                <p>Sidebar</p>
                <hr />
                <Location />
                <hr />
                <Location />
                <hr />

            </div>
        )
    }
}
export default Sidebar