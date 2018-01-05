import _ from 'lodash'
import {INITIAL_SETTINGS} from './constants/index'

chrome.storage.sync.get(INITIAL_SETTINGS, (settings) => {
  if (settings.enabled) {
    const innerText = document.body.innerText
    const data = _.attempt(JSON.parse, innerText)
    const isJSON = !_.isError(data) && typeof data === 'object' && data !== null
    if (isJSON) {
      const React = require('react')
      const ReactDOM = require('react-dom')

      require('../img/json-viewer-react-icon-16.png')
      require('../img/json-viewer-react-icon-48.png')
      require('../img/json-viewer-react-icon-128.png')
      require('../../node_modules/font-awesome/css/font-awesome.min.css')

      const App = require('./views/app').App
      ReactDOM.render(
        <App data={data} settings={settings} />,
        document.body
      )
    }
  }
})
