import _ from 'lodash'
import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import cx from 'classnames'

import {ContainerJSON} from '../../components/container_json/index'
import {ContainerRaw} from '../../components/container_raw/index'
import {Path} from '../../components/path/index'
import {Spinner} from '../../components/spinner/index'
import {Toolbar} from '../../components/toolbar/index'

import './styles.css'

export class App extends React.Component {
  constructor () {
    super()
    this.toggleIsExpanded = this.toggleIsExpanded.bind(this)
    this.toggleIsRaw = this.toggleIsRaw.bind(this)
    this.state = {isExpanded: false, isRaw: false, isLoading: false}
  }

  componentDidMount () {
    ReactDOM.findDOMNode(this).addEventListener('click', (event) => {
      _.forEach(document.querySelectorAll('div.json-viewer-react-contextmenu:not(.json-viewer-react-hide)'), (node) => {
        node.classList = 'json-viewer-react-contextmenu json-viewer-react-hide'
      })
    })
  }

  toggleIsExpanded () {
    this.setState({isExpanded: !this.state.isExpanded})
  }

  toggleIsRaw () {
    this.setState({isRaw: !this.state.isRaw})
  }

  render () {
    return (
      <div className='json-viewer-react-app'>
        <Toolbar
          isRaw={this.state.isRaw}
          isExpanded={this.state.isExpanded}
          toggleIsRaw={this.toggleIsRaw}
          toggleIsExpanded={this.toggleIsExpanded}
        />
        <Path />
        <ContainerJSON
          data={this.props.data}
          isExpanded={this.state.isExpanded}
          settings={this.props.settings}
          updateParentState={this.updateParentState}
        />
        {this.state.isRaw && (
          <ContainerRaw
            data={this.props.data}
            updateParentState={this.updateParentState}
          />
        )}
        {this.state.isLoading && <Spinner />}
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
