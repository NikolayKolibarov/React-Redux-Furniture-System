import React, { Component } from 'react'
import { Link } from 'react-router'

export default class FurnitureList extends Component {
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
        {this.renderFurniture()}
      </div>
    )
  }
}
