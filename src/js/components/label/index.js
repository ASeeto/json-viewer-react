import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import cx from 'classnames'

import './styles.css'

export class Label extends React.Component {
  constructor () {
    super()
    this.copy = this.copy.bind(this)
    this.copyPath = this.copyPath.bind(this)
    this.copyData = this.copyData.bind(this)
  }

  componentDidMount () {
    ReactDOM.findDOMNode(this).addEventListener('mouseenter', (event) => {
      let path = event.target.getAttribute('data-path')
      document.getElementById('json-viewer-react-path').innerHTML = path
    })
    ReactDOM.findDOMNode(this).addEventListener('contextmenu', (event) => {
      event.preventDefault()
      this.refs[this.props.path].classList = 'json-viewer-react-contextmenu json-viewer-react-contextmenu-visible'
      return false
    })
  }

  copy ({id, value}) {
    const textarea = document.createElement('textarea')
    textarea.setAttribute('id', id)
    textarea.innerHTML = value
    textarea.setAttribute('style', 'position: fixed;')
    document.body.appendChild(textarea)
    document.getElementById(id).focus()
    document.getElementById(id).select()
    document.execCommand('copy')
    document.body.removeChild(textarea)
  }

  copyData (event) {
    event.stopPropagation()
    this.copy({
      id: 'copy-data',
      value: JSON.stringify(_.get(this.props.data, this.props.path), null, 2)
    })
    this.refs[this.props.path].classList = 'json-viewer-react-contextmenu'
  }

  copyPath (event) {
    event.stopPropagation()
    this.copy({
      id: 'copy-path',
      value: this.props.path
    })
    this.refs[this.props.path].classList = 'json-viewer-react-contextmenu'
  }

  render () {
    return (
      <span data-path={this.props.path}>
        {this.props.text}
        <div ref={this.props.path} className={'json-viewer-react-contextmenu'}>
          <p className='json-viewer-react-p json-viewer-react-contextmenu-option' onClick={this.copyPath}>
            <i className='fa fa-clipboard' /> Copy Path
          </p>
          <p className='json-viewer-react-p json-viewer-react-contextmenu-option' onClick={this.copyData}>
            <i className='fa fa-clone' /> Copy Data
          </p>
        </div>
      </span>
    )
  }
}

Label.PropTypes = {
  data: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]).isRequired,
  path: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
}
