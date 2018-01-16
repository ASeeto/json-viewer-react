import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import {THEMES} from '../../constants'

import JSONTree from 'react-json-tree'
import {Label} from '../label/index'

import './styles.css'

export class ContainerJSON extends React.Component {
  constructor () {
    super()
    this.labelRenderer = this.labelRenderer.bind(this)
    this.closeSubview = this.closeSubview.bind(this)
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
        {...this.props}
        path={newPath.join('')}
        text={_.last(newPath)}
      />
    )
  }

  closeSubview () {
    this.props.updateSubviews({subviewId: this.props.path})
  }

  render () {
    const theme = THEMES[this.props.settings.theme]
    const shouldExpandNode = this.props.isExpanded
      ? () => true
      : () => false
    const className = cx({
      'json-viewer-react-sub-json-tree': this.props.isSubview
    })
    return (
      <div id='json-viewer-react-json-tree' className={className}>
        <JSONTree
          data={this.props.data}
          hideRoot={this.props.hideRoot}
          theme={theme}
          invertTheme={this.props.settings.invertTheme}
          labelRenderer={this.labelRenderer}
          shouldExpandNode={shouldExpandNode}
        />
        {this.props.isSubview && (
          <div className='json-viewer-react-subview-toolbar'>
            <div className='json-viewer-react-subview-toolbar-close' onClick={this.closeSubview}>
              Close Subview
            </div>
            <div style={{color: theme.base0D}} className='json-viewer-react-subview-toolbar-text'>
              {this.props.text}
            </div>
          </div>
        )}
      </div>
    )
  }
}

ContainerJSON.PropTypes = {
  data: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]).isRequired,
  isExpanded: PropTypes.bool.isRequired,
  isSubview: PropTypes.bool.isRequired,
  path: PropTypes.string,
  settings: PropTypes.object.isRequired,
  style: PropTypes.object,
  updateSubviews: PropTypes.func.isRequired
}
