import React from 'react'
import PropTypes from 'prop-types'

import {THEMES} from '../../constants'

import JSONTree from 'react-json-tree'
import {Label} from '../label/index'

import './styles.css'

export class ContainerJSON extends React.Component {
  constructor () {
    super()
    this.labelRenderer = this.labelRenderer.bind(this)
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

  render () {
    const theme = THEMES[this.props.settings.theme]
    const shouldExpandNode = this.props.isExpanded
      ? () => true
      : () => false
    return (
      <div id='json-viewer-react-json-tree'>
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

ContainerJSON.PropTypes = {
  data: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]).isRequired,
  isExpanded: PropTypes.bool.isRequired,
  settings: PropTypes.object.isRequired
}
