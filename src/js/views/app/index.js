import _ from 'lodash'
import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import JSONTree from 'react-json-tree'
import cx from 'classnames'

import {THEMES} from '../../constants'
import {Label} from '../../components/label/index'

import '../../../../node_modules/font-awesome/css/font-awesome.min.css'
import './styles.css'

export class App extends React.Component {
  constructor () {
    super()
    this.toggleIsExpanded = this.toggleIsExpanded.bind(this)
    this.toggleToolbar = this.toggleToolbar.bind(this)
    this.labelRenderer = this.labelRenderer.bind(this)
    this.state = {
      isExpanded: false,
      hideToolbar: false
    }
  }

  componentDidMount () {
    ReactDOM.findDOMNode(this).addEventListener('click', (event) => {
      _.forEach(document.querySelectorAll('.json-viewer-react-contextmenu.json-viewer-react-contextmenu-visible'), (node) => {
        node.classList = 'json-viewer-react-contextmenu'
      })
    })
  }

  labelRenderer (pathArray) {
    let newPath = []

    _.forEach(pathArray.slice().reverse(), (val, index) => {
      if (isNaN(val)) {
        if (!_.isEmpty(newPath)) {
          newPath.push('.')
        }
        newPath.push(val)
      } else {
        var parentVal = index === 0 ? this.props.data : _.get(this.props.data, newPath.join(''))
        if (parentVal instanceof Array) {
          newPath.push(`[${val}]`)
        } else {
          if (!_.isEmpty(newPath)) {
            newPath.push('.')
          }
          newPath.push(val)
        }
      }
    })

    return (
      <Label 
        data={this.props.data}
        path={newPath.join('')}
        text={_.last(newPath)}
      />
    )
  }

  toggleIsExpanded () {
    this.setState({isExpanded: !this.state.isExpanded})
  }

  toggleToolbar () {
    this.setState({hideToolbar: !this.state.hideToolbar})
  }

  render () {
    const shouldExpandNode = this.state.isExpanded
      ? () => true
      : () => false
    const theme = THEMES[this.props.settings.theme]
    return (
      <div className='json-viewer-react-app'>
        <div className='json-viewer-react-icon' onClick={this.toggleIsExpanded}>
          {this.state.isExpanded
            ? <i className='fa fa-compress' />
            : <i className='fa fa-expand' />
          }
        </div>
        <div className={cx('json-viewer-react-toolbar', {'json-viewer-react-toolbar-transform': this.state.hideToolbar})}>
          <div className='json-viewer-react-toggle-toolbar' onClick={this.toggleToolbar}>
            {this.state.hideToolbar
              ? <i className='fa fa-arrow-left' />
              : <i className='fa fa-arrow-right' />
            }
          </div>
          <div className='json-viewer-react-card'>
            <p className='json-viewer-react-p json-viewer-react-title'>Path:</p>
            <div id='json-viewer-react-path'>Hover over a key</div>
          </div>
        </div>
        <JSONTree
          data={this.props.data}
          hideRoot
          theme={theme}
          invertTheme={this.props.settings.invertTheme}
          labelRenderer={this.labelRenderer}
          shouldExpandNode={shouldExpandNode}
        />
      </div>
    )
  }
}

App.PropTypes = {
  data: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]).isRequired,
  settings: PropTypes.object.isRequired
}
