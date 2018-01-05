import React from 'react'
import cx from 'classnames'

import './styles.css'

export class Path extends React.Component {
  constructor () {
    super()
    this.toggle = this.toggle.bind(this)
    this.state = {hide: false}
  }

  toggle () {
    this.setState({hide: !this.state.hide})
  }

  render () {
    return (
      <div className={cx('json-viewer-react-no-select', 'json-viewer-react-path-container', {'json-viewer-react-path-container-transform': this.state.hide})}>
        <div className='json-viewer-react-toggle-path-container' onClick={this.toggle}>
          {this.state.hide ? <i className='fa fa-arrow-left' /> : <i className='fa fa-arrow-right' />}
        </div>
        <div className='json-viewer-react-card'>
          <p className='json-viewer-react-p json-viewer-react-title'>Path:</p>
          <div id='json-viewer-react-path'>Hover over a key</div>
        </div>
      </div>
    )
  }
}
