import React from 'react'
import PropTypes from 'prop-types'

import './styles.css'

export class Toolbar extends React.Component {
  constructor (props) {
    super(props)
    this.copy = this.copy.bind(this)
  }

  copy ({id}) {
    const textarea = document.createElement('textarea')
    textarea.setAttribute('id', id)
    textarea.innerHTML = JSON.stringify(this.props.data)
    textarea.setAttribute('style', 'position: fixed;')
    document.body.appendChild(textarea)
    document.getElementById(id).focus()
    document.getElementById(id).select()
    document.execCommand('copy')
    document.body.removeChild(textarea)
  }

  render () {
    return (
      <div className='json-viewer-react-no-select json-viewer-react-toolbar'>
        {this.props.isRaw
          ? (
            <div
              className='json-viewer-react-toolbar-button'
              onClick={this.copy({id: 'json-viewer-react-copy-raw-flat'})}>
              Copy Raw Flat
            </div>
          )
          : (
            <div className='json-viewer-react-toolbar-button' onClick={this.props.toggleIsExpanded}>
              {this.props.isExpanded ? 'Collapse All' : 'Expand All'}
            </div>
          )
        }
        <div className='json-viewer-react-toolbar-button' onClick={this.props.toggleIsRaw}>
          {this.props.isRaw ? 'Parsed' : 'Raw'}
        </div>
      </div>
    )
  }
}

Toolbar.PropTypes = {
  data: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]).isRequired,
  isExpanded: PropTypes.bool.isRequired,
  isRaw: PropTypes.bool.isRequired,
  toggleIsExpanded: PropTypes.func.isRequired,
  toggleIsRaw: PropTypes.func.isRequired
}
