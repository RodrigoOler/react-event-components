import { Component } from 'react'
import { func } from 'prop-types'

const geolocation = 'geolocation' in navigator ? navigator.geolocation : null

class GeolocationChange extends Component {
  componentDidMount() {
    if (geolocation) {
      const watchId = geolocation.watchPosition(
        this.props.do,
        this.handleError.bind(this)
      )
      this.setState({ watchId })
    }
  }

  componentWillUnmount() {
    if (geolocation) {
      geolocation.clearWatch(this.state.watchId)
    }
  }

  handleError (error) {
    if (typeof this.props.onError === 'function') {
      this.props.onError(error)
    }
  }

  shouldComponentUpdate() {
    return false
  }

  render() {
    return null
  }
}

GeolocationChange.propTypes = {
  /**
   * Triggered when the location change
   * @type {Function}
   */
  do: func.isRequired,
  /**
   * Triggered when location error occurs
   * @type {Function}
   */
  onError: func
}

export default GeolocationChange
