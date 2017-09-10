import React, { Component } from 'react'
import { Link } from 'react-router'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { fetchUserFurniture, removeFurniture } from '../store/furniture'

class Profile extends Component {
  componentDidMount () {
    this.props.fetchUserFurniture()
  }

  remove (furnitureId) {
    this.props.removeFurniture(furnitureId)
  }

  renderFurniture () {
    if (this.props.furniture && this.props.furniture.length > 0) {
      return this.props.furniture.map(piece => {
        return (
          <div key={piece.id} className='furniture-piece-list-item'>
            <div className='panel panel-default'>
              <div className='panel-body'>
                <h2>{piece.make} {piece.model} {piece.engine}</h2>
                <img src={piece.image} className='img-responsive' />
                <h3>{piece.price}lv</h3>
                <p />
                <Link to={`/furniture/details/${piece.id}`} className='btn btn-default'> View Details
                </Link>
                <button className='btn btn-default' onClick={this.remove.bind(this, piece.id)}>
                  Remove
                </button>
              </div>
            </div>
            <hr />
          </div>
        )
      })
    } else {
      return (
        <h3>No furniture to be shown.</h3>
      )
    }
  }

  render () {
    return (
      <div>
        <h1>Profile</h1>
        {this.renderFurniture()}
        <br />
      </div>
    )
  }
}

function mapStateToProps (state) {
  return { furniture: state.furniture.userFurniture }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({fetchUserFurniture, removeFurniture}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
