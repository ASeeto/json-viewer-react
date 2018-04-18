import _ from 'lodash'
import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import cx from 'classnames'
import {invertTheme as invertThemeFunction} from 'react-base16-styling'

import {ContainerJSON} from '../../components/container_json/index'
import {Path} from '../../components/path/index'
import {Spinner} from '../../components/spinner/index'
import {Toolbar} from '../../components/toolbar/index'

import {THEMES} from '../../constants/index'

import './styles.css'

export class App extends React.Component {
  constructor (props) {
    super(props)
    this.toggleIsExpanded = this.toggleIsExpanded.bind(this)
    this.updateSubviews = this.updateSubviews.bind(this)
    this.state = {isExpanded: props.settings.conditionalExpandAll, isLoading: false, subviews: []}
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

    const RawJson = document.getElementsByTagName('pre')[0]
    RawJson.classList = 'json-viewer-react-hide'
  }

  componentWillUnmount () {
    ReactDOM.findDOMNode(this).removeEventListener('click', () => {})
  }

  toggleIsExpanded () {
    this.setState({isExpanded: !this.state.isExpanded})
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
          rootPath=''
        />
        {this.state.isLoading && <Spinner />}
        {_.isEmpty(this.state.subviews) && (
          <Toolbar
            data={this.props.data}
            isExpanded={this.state.isExpanded}
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
              rootPath={subview.props.path}
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
