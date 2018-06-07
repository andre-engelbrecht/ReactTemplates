'use strict'

import React from 'react'
import { connect } from 'react-redux'
import { Button, Collapse } from 'mdbreact';
import ActiveFilters from '../sections/ActiveFilters.jsx'
import FilterToggleButton from '../input/FilterToggleButton.jsx'
import FilterButtonsPanel from '../layout/FilterButtonsPanel.jsx'
import FilterCollapsePanel from '../layout/FilterCollapsePanel.jsx'

//Filter input components
import SelectInput from '../input/SelectInput.jsx'
import TextInputWithApply from '../input/TextInputWithApply.jsx'
import TreeInput from '../input/TreeInput.jsx'
import TreeSelectInput from '../input/TreeSelectInput.jsx'
//Filter input components

const mapStateToProps = (state, props) => {
  let { filters: { activeFilters } } = state
  return { activeFilters }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setFilter: (key, value) => {
      dispatch({ type: "SET_FILTER", payload: { key, value } })
    },
    clearFilters: () => {
      dispatch({ type: "CLEAR_FILTERS", payload: null })
    },
    resetBatchCount: () => {
      dispatch({ type: "RESET_BATCH_COUNT", payload: null })
    }
  }
}

class Filters extends React.Component {

  constructor(props) {
    super(props);
    // this.toggle = this.toggle.bind(this)
    this.getFilterValue = this.getFilterValue.bind(this)
    this.getFilterKey = this.getFilterKey.bind(this)

    this.state = { collapse: "" };
  }

  toggle(value) {

    if (this.state.collapse !== value) {
      this.setState({ collapse: value });
    }
    else {
      this.setState({ collapse: "" });
    }
  }

  setTextFilter(key, value) {
    if (typeof key !== 'undefined' && typeof value !== 'undefined') {
      this.props.resetBatchCount()
      this.props.setFilter(key, value)
    }
  }

  setListFilter(key, value) {
    if (typeof key !== 'undefined' && typeof value !== 'undefined') {
      this.props.resetBatchCount()
      this.props.setFilter(key, value.text)
    }
  }

  getFilterValue(key) {

    let { activeFilters } = this.props
    let value = ""

    let filterItem = activeFilters.filter(x => x.key === key)[0]
    if (typeof filterItem !== 'undefined') {
      value = filterItem.value
    }

    return value
  }

  getFilterKey(key) {
    return key + "_" + this.getFilterValue(key)
  }

  clearFilters() {
    if (this.props.activeFilters.length > 0) {
      this.props.resetBatchCount()
      this.props.clearFilters()
    }
  }

  render() {

    let { activeFilters } = this.props
    let filterButtonStyle = { marginLeft: "0px", width: "100%" }

    return (
      <>
        <ActiveFilters />
        <hr />

        {/*
        ##################################################
        Change the code below by creating your own toggle 
        buttons and corresponding collapse areas.
        ##################################################
        */}

        <FilterButtonsPanel>
          <div className="row">
            <div className="col-md-3">
              {/* 
              ########################################
              This is an example filter toggle button.
              Replace with your own.
              ########################################
              */}
              <FilterToggleButton label="Toggle example filters" callback={this.toggle.bind(this, "#1")} />
            </div>
            <div className="col-md-3">
              <FilterToggleButton label="Toggle non-existing filters" callback={this.toggle.bind(this, "#2")} />
            </div>
            <div className="col-md-3">
              {/* Nothing here yet */}
            </div>
            <div className="col-md-3">
              {/* Please keep this button  */}
              <FilterToggleButton label="Clear Filters" color="warning" callback={this.clearFilters.bind(this)} />
            </div>
          </div>
        </FilterButtonsPanel>

        {/* 
        ###############################################################
        This is an example collapsable (filter) panel. 
        Replace with your own.
        Make use of the filter-input components to simplify your work.
        ###############################################################
        */}
        <FilterCollapsePanel isOpen={this.state.collapse === "#1"}>
          <div className="row">
            <div className="col-md-4">
              <TextInputWithApply
                key={this.getFilterKey("text")}
                label="Example text filter:"
                callback={this.setTextFilter.bind(this, "text")}
                value={this.getFilterValue("text")}
              />
            </div>
            <div className="col-md-4">
              <SelectInput
                key={this.getFilterKey("list")}
                label="Example select/list filter:"
                callback={this.setListFilter.bind(this, "list")}
                data={[{ id: 1, text: "One" }, { id: 2, text: "Two" }, { id: 3, text: "Three" }]}
                value={this.getFilterValue("list")}
              />
            </div>
            <div className="col-md-4">
              <TreeSelectInput
                key={this.getFilterKey("tree")}
                label="Example tree-select filter:"
                callback={this.setListFilter.bind(this, "tree")}
                data={[{ id: 1, text: "Parent1", children: [{ id: 11, text: "Child1", children: [{ id: 111, text: "SubChild1" }] }, { id: 12, text: "Child2" }] }, { id: 2, text: "Parent2" }]}
                value={this.getFilterValue("tree")}
              />
            </div>
          </div>
        </FilterCollapsePanel>
      </>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Filters)