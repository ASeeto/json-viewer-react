import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classNames'

import './styles.css'

export class Toolbar extends React.Component {
  constructor (props) {
    super(props)
    this.copy = this.copy.bind(this)
  }

  componentDidMount () {
    const ToggleViewButton = document.getElementById('json-viewer-react-toggle-view')
    const ToggleCollapseButton = document.getElementById('json-viewer-react-toggle-collapse')
    const JsonTree = document.getElementById('json-viewer-react-json-tree')
    
    /** Toggle View */
    ToggleViewButton.addEventListener('click', () => {
      /** Hide json tree */
      JsonTree.classList = cx({
        'json-viewer-react-hide': !_.includes(JsonTree.classList, 'json-viewer-react-hide')
      })
      /** Hide Collapse/Expand button */
      ToggleCollapseButton.classList = cx('json-viewer-react-toolbar-button', {
        'json-viewer-react-hide': !_.includes(ToggleCollapseButton.classList, 'json-viewer-react-hide')
      })
      /** Update innerText */
      ToggleViewButton.innerText = ToggleViewButton.innerText === 'Raw' ? 'Parsed' : 'Raw'
    })
  }

  componentWillUnmount () {
    const ToggleViewButton = document.getElementById('json-viewer-react-toggle-view')
    ToggleViewButton.removeEventListener('click', () => {})
  }

  copy () {
    const id = 'json-viewer-react-copy-raw-flat'
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
        <div className='json-viewer-react-toolbar-button' onClick={this.copy}>
          Copy Raw Flat
        </div>
        <div id='json-viewer-react-toggle-collapse' className='json-viewer-react-toolbar-button' onClick={this.props.toggleIsExpanded}>
          {this.props.isExpanded ? 'Collapse All' : 'Expand All'}
        </div>
        <div id='json-viewer-react-toggle-view' className='json-viewer-react-toolbar-button'>
          Raw
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
  toggleIsExpanded: PropTypes.func.isRequired
}
