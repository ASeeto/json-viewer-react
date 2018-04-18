import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import './styles.css'

export class Label extends React.Component {
  constructor () {
    super()
    this.copy = this.copy.bind(this)
    this.copyPath = this.copyPath.bind(this)
    this.copyData = this.copyData.bind(this)
    this.openSubview = this.openSubview.bind(this)
  }

  componentDidMount () {
    ReactDOM.findDOMNode(this).addEventListener('mouseenter', (event) => {
      let path = event.target.getAttribute('data-path')
      const node = document.getElementById('json-viewer-react-path')
      node.innerHTML = path
      node.scrollTop = node.scrollHeight;
    })
    ReactDOM.findDOMNode(this).addEventListener('contextmenu', (event) => {
      event.preventDefault()
      this.refs[this.props.path].classList = 'json-viewer-react-contextmenu'
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
    this.refs[this.props.path].classList = 'json-viewer-react-contextmenu json-viewer-react-hide'
  }

  copyPath (event) {
    event.stopPropagation()
    this.copy({
      id: 'copy-path',
      value: this.props.rootPath + this.props.path
    })
    this.refs[this.props.path].classList = 'json-viewer-react-contextmenu json-viewer-react-hide'
  }

  openSubview (event) {
    event.stopPropagation()
    this.props.updateSubviews({
      props: this.props,
      subviewId: this.props.path,
      method: 'open'
    })
  }

  render () {
    return (
      <span data-path={this.props.rootPath + this.props.path}>
        {this.props.text}
        <div ref={this.props.path} className={'json-viewer-react-contextmenu json-viewer-react-hide'}>
          <p className='json-viewer-react-p json-viewer-react-contextmenu-option' onClick={this.copyPath}>
            <div className='fa fa-fw fa-clipboard' />
            <div className='json-viewer-react-contextmenu-option-text json-viewer-react-no-select'>Copy Path</div>
          </p>
          <p className='json-viewer-react-p json-viewer-react-contextmenu-option' onClick={this.copyData}>
            <div className='fa fa-fw fa-clone' />
            <div className='json-viewer-react-contextmenu-option-text json-viewer-react-no-select'>Copy Data</div>
          </p>
          {!this.props.isSubview && (
            <p className='json-viewer-react-p json-viewer-react-contextmenu-option' onClick={this.openSubview}>
              <div className='fa fa-fw fa-expand' />
              <div className='json-viewer-react-contextmenu-option-text json-viewer-react-no-select'>Open Subview</div>
            </p>
          )}
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
  isSubview: PropTypes.bool,
  path: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  updateSubviews: PropTypes.func.isRequired
}
