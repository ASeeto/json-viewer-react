import _ from 'lodash'
import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import cx from 'classnames'
import {invertTheme as invertThemeFunction} from 'react-base16-styling'

import {ContainerJSON} from '../../components/container_json/index'
import {ContainerRaw} from '../../components/container_raw/index'
import {Path} from '../../components/path/index'
import {Spinner} from '../../components/spinner/index'
import {Toolbar} from '../../components/toolbar/index'

import {THEMES} from '../../constants/index'

import './styles.css'

export class App extends React.Component {
  constructor () {
    super()
    this.toggleIsExpanded = this.toggleIsExpanded.bind(this)
    this.toggleIsRaw = this.toggleIsRaw.bind(this)
    this.updateSubviews = this.updateSubviews.bind(this)
    this.state = {isExpanded: false, isRaw: false, isLoading: false, subviews: []}
  }

  componentDidMount () {
    let {invertTheme, theme} = this.props.settings
    const themeColorMap = invertTheme ? invertThemeFunction(THEMES[theme]) : THEMES[theme]
    document.body.style.background = themeColorMap.base00

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

  updateSubviews ({props, subviewId, method = 'close'}) {
    const subviews = method === 'open'
      ? this.state.subviews.concat([{props, subviewId}])
      : _.filter(this.state.subviews, (subview) => subview.subviewId !== subviewId)
    this.setState({subviews})
  }

  render () {
    return (
      <div className='json-viewer-react-app'>
        <Path />
        <ContainerJSON
          data={this.props.data}
          hideRoot
          isExpanded={this.state.isExpanded}
          isSubview={false}
          settings={this.props.settings}
          updateSubviews={this.updateSubviews}
        />
        {this.state.isRaw && <ContainerRaw data={this.props.data} />}
        {this.state.isLoading && <Spinner />}
        {_.isEmpty(this.state.subviews) && (
          <Toolbar
            data={this.props.data}
            isRaw={this.state.isRaw}
            isExpanded={this.state.isExpanded}
            toggleIsRaw={this.toggleIsRaw}
            toggleIsExpanded={this.toggleIsExpanded}
          />
        )}
        {this.state.subviews.map((subview, index) => (
          <div>
            <ContainerJSON
              {...subview.props}
              data={_.get(this.props.data, subview.props.path, {})}
              hideRoot
              isExpanded
              isSubview
            />
          </div>
        ))}
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
