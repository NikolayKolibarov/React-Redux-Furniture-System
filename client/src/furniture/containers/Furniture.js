import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { fetchFurniture } from '../../store/furniture'

import FurnitureSearchBar from './FurnitureSearchBar'
import FurnitureList from '../components/FurnitureList'
import Paginator from '../../shared/components/Paginator'

class Furniture extends Component {
  constructor (props) {
    super(props)

    this.previousPage = this.previousPage.bind(this)
    this.nextPage = this.nextPage.bind(this)

    this.state = {
      page: 1,
      searchInput: ''
    }
  }

  componentDidMount () {
    this.props.fetchFurniture(this.state.page)
  }

  componentWillUpdate (nextProps, nextState) {
    if (this.state.page !== nextState.page) {
      if (this.state.searchInput.trim() === '') {
        this.props.fetchFurniture(nextState.page)
      }
    }
  }

  onSearch (searchStr) {
    this.setState({
      searchInput: searchStr
    })
  }

  previousPage () {
    if (this.state.page > 1) {
      this.setState((prevState, props) => ({
        page: prevState.page - 1
      }))
    }
  }

  nextPage () {
    this.setState((prevState, props) => ({
      page: prevState.page + 1
    }))
  }

  renderFurniture () {
    if (this.state.searchInput.trim() === '') {
      return (
        <FurnitureList furniture={this.props.furniture} />
      )
    } else {
      return (
        <FurnitureList furniture={this.props.searchResults} />
      )
    }
  }

  render () {
    return (
      <div>
        <h1>Furniture</h1>
        <FurnitureSearchBar page={this.state.page} onSearch={this.onSearch.bind(this)} />
        {this.renderFurniture()}
        <Paginator
          page={this.state.page}
          items={this.state.searchInput.trim() === '' ? this.props.furniture : this.props.searchResults}
          previousPage={this.previousPage}
          nextPage={this.nextPage} />
        <br />
      </div>
    )
  }
}

function mapStateToProps (state) {
  return { furniture: state.furniture.all, searchResults: state.furniture.searchResults }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({fetchFurniture}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Furniture)
