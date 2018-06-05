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
    this.copyTransposed = this.copyTransposed.bind(this)
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

  copyTransposed (event) {
    event.stopPropagation()
    const id = 'copy-transposed'
    const value = _.get(this.props.data, this.props.path)
    const table = document.createElement('table')
    let innerHTML = ''

    table.setAttribute('id', id)

    innerHTML += '<tr>'

    _.forEach(value, (data) => {
      innerHTML += `<td>${data}</td>`
    })

    innerHTML += '</tr>'

    table.innerHTML = innerHTML
    table.setAttribute('style', 'position: fixed;')
    document.body.appendChild(table)
    document.getElementById(id).focus()

    if (document.createRange && window.getSelection) {
      const range = document.createRange();
      const sel = window.getSelection();
      sel.removeAllRanges();
      try {
          range.selectNodeContents(table);
          sel.addRange(range);
      } catch (e) {
          range.selectNode(table);
          sel.addRange(range);
      }
    } else if (document.body.createTextRange) {
        range = document.body.createTextRange();
        range.moveToElementText(table);
        range.select();
    }

    document.execCommand('copy')
    document.body.removeChild(table)
    this.refs[this.props.path].classList = 'json-viewer-react-contextmenu json-viewer-react-hide'
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
    const data = _.get(this.props.data, this.props.path)
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
          {_.isArray(data) && _.every(data, (d) => !_.isObject()) && (
            <p className='json-viewer-react-p json-viewer-react-contextmenu-option' onClick={this.copyTransposed}>
              <div className='fa fa-fw fa-expand' />
              <div className='json-viewer-react-contextmenu-option-text json-viewer-react-no-select'>Copy Data (Transposed)</div>
            </p>
          )}
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
