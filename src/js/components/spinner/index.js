import React from 'react'

import './styles.css'

export class Spinner extends React.Component {
  render () {
    return (
      <div id='json-viewer-react-spinner' className='json-viewer-react-spinner'>
        <div className='json-viewer-react-spinner-flex'>
          <div className='json-viewer-react-icon-rotating fa fa-fw fa-spinner' />
        </div>
      </div>
    )
  }
}
