import _ from 'lodash'
import React from 'react'
import ReactDOM from 'react-dom'

import '../img/json-viewer-react-icon-16.png'
import '../img/json-viewer-react-icon-48.png'
import '../img/json-viewer-react-icon-128.png'

import {App} from './views/app'
import {INITIAL_SETTINGS} from './constants/index'

chrome.storage.sync.get(INITIAL_SETTINGS, (settings) => {
  if (settings.enabled) {
    const data = _.attempt(JSON.parse, document.body.innerText)
    const isJSON = !_.isError(data)
    if (isJSON) {
      ReactDOM.render(
        <App data={data} settings={settings} />,
        document.body
      )
    }
  }
})
