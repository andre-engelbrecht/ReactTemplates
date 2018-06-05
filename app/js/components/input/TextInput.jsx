'use strict'

import React from 'react'
import { Input, Tooltip } from 'mdbreact'

// Properties:
//  - label : Component label
//  - tooltip : Tooltip
//  - value : String/text value
//  - callback : callback to send filter value

class TextInput extends React.Component {

  constructor(props) {
    super(props);

    this.state = { value: "" }
  }

  componentDidMount() {

    let { value } = this.props

    if (typeof value === 'undefined') {
      value = ""
    }

    this.setState({ value: value })
  }

  onChange(event) {

    //Update internal state
    this.setState({ value: event.target.value })

    let { callback } = this.props

    if (typeof callback !== 'undefined') {
      callback(event.target.value)
    }
  }

  fixEmptyValue(value, defaultValue) {
    if (typeof value === 'undefined') {
      return defaultValue
    }

    return value
  }

  render() {

    let { label, tooltip, allowEdit } = this.props
    let { value } = this.state

    label = this.fixEmptyValue(label, "Label:")
    tooltip = this.fixEmptyValue(tooltip, "")
    allowEdit = this.fixEmptyValue(allowEdit, true)

    return (
      <>
        <div hidden={tooltip === ""}>
          <Tooltip
            placement="top"
            component="label"
            tooltipContent={tooltip}>
            <b>{label}</b>
          </Tooltip>
        </div>
        <div hidden={tooltip !== ""}>
          <b>{label}</b>
        </div>

        <Input disabled={!allowEdit} size="sm" style={{ marginLeft: "0px", marginRight: "0px", marginTop: "-25px", width: "100%", fontSize: "15px" }}
          onChange={this.onChange.bind(this)} hint="Type value here"
          value={value} />
      </>
    )
  }
}

export default TextInput