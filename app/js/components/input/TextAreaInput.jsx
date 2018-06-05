'use strict'

import React from 'react'
import { Input, Tooltip } from 'mdbreact'
import TextareaAutosize from "react-textarea-autosize"

//Requires: react-textarea-autosize

// Properties:
//  - label : Component label
//  - tooltip : Tooltip
//  - value : String/text value
//  - callback : callback to send filter value

class TextAreaInput extends React.Component {

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

        <TextareaAutosize
          readOnly={!allowEdit}
          style={{
            borderStyle: "solid",
            borderWidth: "0px 0px 1px 0px",
            borderColor: "#b4b4b4",
            paddingBottom: "4px",
            width: "100%"
          }}
          value={value}
          onChange={this.onChange.bind(this)}
        />
      </>
    )
  }
}

export default TextAreaInput