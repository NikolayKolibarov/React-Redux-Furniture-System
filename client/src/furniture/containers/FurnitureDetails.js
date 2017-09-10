import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { fetchFurniturePiece, fetchFurnitureReviews, likeFurniture } from '../../store/furniture'
import { resetError } from '../../store/messages'

import CreateReviewForm from './CreateReviewForm'
import ReviewsList from '../components/ReviewsList'
import Error from '../../shared/components/Error'

class FurnitureDetails extends Component {
  constructor (props) {
    super(props)

    this.state = {
      furniturePieceId: this.props.params.id
    }
  }

  componentWillUnmount () {
    if (this.props.error) {
      this.props.resetError()
    }
  }

  componentDidMount () {
    this.props.fetchFurniturePiece(this.state.furniturePieceId)
    this.props.fetchFurnitureReviews(this.state.furniturePieceId)
  }

  back () {
    window.location.href = window.history.back(1)
  }

  like () {
    this.props.likeFurniture(this.state.furniturePieceId)
  }

  renderFurniturePiece () {
    if (this.props.furniturePiece) {
      const furniturePiece = this.props.furniturePiece

      return (
        <div>
          <h1>{furniturePiece.make} {furniturePiece.model}</h1>
          <div className='panel panel-default'>
            <div className='panel-body'>
              <img src={furniturePiece.image} className='img-responsive' />
              <h3>{furniturePiece.price}lv</h3>
              <p>Make - {furniturePiece.make}</p>
              <p>Model - {furniturePiece.model}</p>
              <p>Year - {furniturePiece.year}</p>
              {furniturePiece.material ? <p>Material - {furniturePiece.material}</p> : ''}
              <button className='btn btn-default' onClick={this.like.bind(this)}>Like</button>
              {furniturePiece.likes}
              <p />
              {this.renderAlert()}
            </div>
          </div>
        </div>
      )
    }
  }

  renderAlert () {
    if (this.props.error) {
      return (
        <Error error={this.props.error} />
      )
    }
  }

  render () {
    return (
      <div>
        {this.renderFurniturePiece()}
        <button className='btn btn-default' onClick={this.back.bind(this)}>Back</button>
        <p />
        <h2>Add Review</h2>
        <CreateReviewForm furniturePieceId={this.state.furniturePieceId} />
        <h2>Reviews</h2>
        <ReviewsList reviews={this.props.reviews} />
      </div>
    )
  }
}

function mapStateToProps (state) {
  return { furniturePiece: state.furniture.selected, reviews: state.furniture.selectedFurnitureReviews, error: state.messages.error }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({fetchFurniturePiece, fetchFurnitureReviews, likeFurniture, resetError}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FurnitureDetails)
