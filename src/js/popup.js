import React from 'react'
import ReactDOM from 'react-dom'

import '../img/json-viewer-react-icon-16.png'

import {Popup} from './views/popup/index'
import {INITIAL_SETTINGS} from './constants/index'

chrome.storage.sync.get(INITIAL_SETTINGS, (settings) => {
  ReactDOM.render(
    <Popup settings={settings} />,
    window.document.getElementById('app-container')
  )
})
