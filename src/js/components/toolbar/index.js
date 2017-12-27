import React from 'react'
import PropTypes from 'prop-types'

import './styles.css'

export class Toolbar extends React.Component {
  render () {
    return (
      <div className='json-viewer-react-toolbar'>
        {!this.props.isRaw && (
          <div className='json-viewer-react-toolbar-button' onClick={this.props.toggleIsExpanded}>
            {this.props.isExpanded ? 'Collapse All' : 'Expand All'}
          </div>
        )}
        <div className='json-viewer-react-toolbar-button' onClick={this.props.toggleIsRaw}>
          {this.props.isRaw ? 'Parsed' : 'Raw'}
        </div>
      </div>
    )
  }
}

Toolbar.PropTypes = {
  isExpanded: PropTypes.bool.isRequired,
  isRaw: PropTypes.bool.isRequired,
  toggleIsExpanded: PropTypes.func.isRequired,
  toggleIsRaw: PropTypes.func.isRequired
}
