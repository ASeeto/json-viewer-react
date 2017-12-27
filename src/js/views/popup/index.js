import _ from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'

import {THEMES} from '../../constants'

import './styles.css'

export class Popup extends React.Component {
  constructor (props) {
    super(props)
    this.toggleEnabled = this.toggleEnabled.bind(this)
    this.toggleInvertTheme = this.toggleInvertTheme.bind(this)
    this.handleOnChange = this.handleOnChange.bind(this)
    this.state = props.settings
  }

  toggleEnabled () {
    const enabled = !this.state.enabled
    chrome.storage.sync.set({enabled}, () => {
      this.setState({enabled})
    })
  }

  toggleInvertTheme () {
    const invertTheme = !this.state.invertTheme
    chrome.storage.sync.set({invertTheme}, () => {
      this.setState({invertTheme})
    })
  }

  handleOnChange (event) {
    const theme = event.target.value
    chrome.storage.sync.set({theme}, () => {
      this.setState({theme})
    })
  }

  render () {
    return (
      <div className='json-viewer-react-popup'>
        <div className='json-viewer-react-setting-section'>
          <div className='json-viewer-react-title'>Extension Settings</div>
          <div className='json-viewer-react-flex'>
            <label className='json-viewer-react-switch'>
              <input onClick={this.toggleEnabled} type='checkbox' checked={this.state.enabled} />
              <span className='json-viewer-react-slider json-viewer-react-round' />
            </label>
            <div className='json-viewer-react-subtitle'>Click to {this.state.enabled ? 'Disable' : 'Enable'}</div>
          </div>
          <div className='json-viewer-react-flex'>
            <label className='json-viewer-react-switch'>
              <input onClick={this.toggleInvertTheme} type='checkbox' checked={this.state.invertTheme} />
              <span className='json-viewer-react-slider json-viewer-react-round' />
            </label>
            <div className='json-viewer-react-subtitle'>Invert Theme</div>
          </div>
          <div className='json-viewer-react-title'>Select a Theme</div>
          <select id='json-viewer-react-theme' name='json-viewer-react-theme' onChange={this.handleOnChange}>
            {_.map(THEMES, (value, key) => (
              <option value={key} selected={this.state.theme === key}>
                {key}
              </option>
            ))}
          </select>
        </div>
      </div>
    )
  }
}

Popup.propTypes = {
  settings: PropTypes.object.isRequired
}