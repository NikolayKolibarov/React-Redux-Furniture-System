import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

import { createFurniture } from '../../store/furniture'
import { resetError } from '../../store/messages'

import Error from '../../shared/components/Error'

class CreateFurniture extends Component {
  constructor (props) {
    super(props)

    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  componentWillUnmount () {
    if (this.props.error) {
      this.props.resetError()
    }
  }

  handleFormSubmit ({make, model, year, description, price, image, material}) {
    console.log('Submit')
    this.props.createFurniture({make, model, year, description, price, image, material})
  }

  renderAlert () {
    if (this.props.error) {
      return (
        <Error error={this.props.error} />
      )
    }
  }

  render () {
    const {fields: {make, model, year, description, price, image, material}, handleSubmit} = this.props

    return (
      <div>
        <h1>Create Furniture</h1>
        <div className='panel panel-default'>
          <div className='panel-body'>
            <form onSubmit={handleSubmit(this.handleFormSubmit)}>
              {this.renderAlert()}
              <div className='form-group'>
                <label>Make</label>
                <input type='text' className='form-control' placeholder='Make' {...make} />
                {make.touched && make.error && <div className='error'>{make.error} </div>}
              </div>

              <div className='form-group'>
                <label>Model</label>
                <input type='text' className='form-control' placeholder='Model' {...model} />
                {model.touched && model.error && <div className='error'>{model.error}</div>}
              </div>

              <div className='form-group'>
                <label>Year</label>
                <input type='text' className='form-control' placeholder='Year' {...year} />
                {year.touched && year.error && <div className='error'>{year.error}</div>}
              </div>

              <div className='form-group'>
                <label>Description</label>
                <input type='text' className='form-control' placeholder='Description' {...description} />
                {description.touched && description.error && <div className='error'>{description.error} </div>}
              </div>

              <div className='form-group'>
                <label>Price</label>
                <input type='text' className='form-control' placeholder='Price' {...price} />
                {price.touched && price.error && <div className='error'>{price.error} </div>}
              </div>

              <div className='form-group'>
                <label>Image</label>
                <input type='text' className='form-control' placeholder='Image' {...image} />
                {image.touched && image.error && <div className='error'>{image.error} </div>}
              </div>

              <div className='form-group'>
                <label>Material</label>
                <input type='text' className='form-control' placeholder='Material' {...material} />
              </div>

              <button type='submit' className='btn btn-default'>Create Furniture</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

function validate (values) {
  const errors = {}

  if (!values.make) {
    errors.make = 'Make is required'
  }

  if (!values.model) {
    errors.model = 'Model is required'
  }

  if (!values.year) {
    errors.year = 'Year is required'
  }

  if (!values.description) {
    errors.description = 'Description is required'
  }

  if (!values.price) {
    errors.price = 'Price is required'
  }

  if (!values.image) {
    errors.image = 'Image is required'
  }

  return errors
}

const mapStateToProps = state => {
  return {
    error: state.messages.error
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({createFurniture, resetError}, dispatch)
}

export default reduxForm({
  form: 'CreateFurniture',
  fields: ['make', 'model', 'year', 'description', 'price', 'image', 'material'],
  validate
})(connect(mapStateToProps, mapDispatchToProps)(CreateFurniture))
