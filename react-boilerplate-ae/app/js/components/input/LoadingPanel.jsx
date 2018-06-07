'use strict'

import React from 'react'
import { Spinner, Tooltip } from 'mdbreact'

// Properties:
//  - header : Component header
//  - description : String/text description

class LoadingPanel extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    let { enabled, header, description } = this.props
    let loaderWidth = 350 //default=350
    let loaderHeight = 210 //default=210

    return (
      <>
        <div className="container-fluid">
          <div className="row">
            <div
              hidden={!enabled}
              className="card"
              style={{ height: (loaderHeight + "px"), width: (loaderWidth + 'px'), position: "fixed", left: ((window.innerWidth / 2) - (loaderWidth / 2)), top: ((window.innerHeight / 2) - (loaderHeight / 2)), zIndex: "99" }}>

              <div className="card-body">
                <label style={{ width: "100%", textAlign: "center", fontSize: "x-large", fontWeight: "bold", color: "#4285F4" }}>{header}</label>
                <br />
                <label style={{ width: "100%", textAlign: "center", fontSize: "medium", color: "#4285F4" }}>{description}</label>
                <br />
                <br />
                <span style={{ width: "100px", paddingLeft: ((loaderWidth / 2) - 50) }}>
                  <Spinner big multicolor />
                </span>
              </div>
            </div>
          </div>
        </div>

      </>
    )
  }
}

export default LoadingPanel