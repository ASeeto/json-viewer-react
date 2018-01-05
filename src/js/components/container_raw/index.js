import React from 'react'
import PropTypes from 'prop-types'

import './styles.css'

export class ContainerRaw extends React.Component {
  componentDidMount () {
    document.getElementById('json-viewer-react-json-tree').classList = 'json-viewer-react-hide'
  }

  componentWillUnmount () {
    document.getElementById('json-viewer-react-json-tree').classList = ''
  }

  render () {
    return (
      <div id='json-viewer-react-app-raw' className='json-viewer-react-app-raw'>
        {JSON.stringify(this.props.data, null, 2)}
      </div>
    )
  }
}

ContainerRaw.PropTypes = {
  data: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]).isRequired
}
