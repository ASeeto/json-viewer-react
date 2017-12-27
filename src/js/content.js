import _ from 'lodash'
import React from 'react'
import ReactDOM from 'react-dom'

import '../img/json-viewer-react-icon-16.png'
import '../img/json-viewer-react-icon-48.png'
import '../img/json-viewer-react-icon-128.png'
import '../../node_modules/font-awesome/css/font-awesome.min.css'

import {App} from './views/app'
import {INITIAL_SETTINGS} from './constants/index'

chrome.storage.sync.get(INITIAL_SETTINGS, (settings) => {
  if (settings.enabled) {
    const innerText = document.body.innerText
    const data = _.attempt(JSON.parse, innerText)
    const isJSON = !_.isError(data) && typeof data === 'object' && data !== null
    if (isJSON) {
      ReactDOM.render(
        <App data={data} settings={settings} />,
        document.body
      )
    }
  }
})
