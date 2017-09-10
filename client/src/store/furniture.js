import { browserHistory } from 'react-router'

import { SET_ERROR } from './messages'
import furnitureService from '../shared/services/furnitureService'

// Action Types
const FETCH_FURNITURE = 'FETCH_FURNITURE'
const FETCH_FURNITURE_PIECE = 'FETCH_FURNITURE_PIECE'
const CREATE_FURNITURE = 'CREATE_FURNITURE'
const SEARCH_FURNITURE = 'SEARCH_FURNITURE'
const LIKE_FURNITURE = 'LIKE_FURNITURE'
const RESET_FURNITURE_SEARCH = 'RESET_FURNITURE_SEARCH'
const CREATE_FURNITURE_REVIEW = 'CREATE_FURNITURE_REVIEW'
const FETCH_FURNITURE_REVIEWS = 'FETCH_FURNITURE_REVIEWS'
const FETCH_USER_FURNITURE = 'FETCH_USER_FURNITURE'
const REMOVE_FURNITURE = 'REMOVE_FURNITURE'

// Action Creators
export function fetchFurniture (page) {
  return dispatch => {
    furnitureService
      .getFurniture(page)
      .then(response => {
        dispatch({ type: FETCH_FURNITURE, payload: { furniture: response.data } })
      })
  }
}

export function fetchFurniturePiece (id) {
  return dispatch => {
    furnitureService
      .getFurniturePiece(id)
      .then(response => {
        dispatch({ type: FETCH_FURNITURE_PIECE, payload: { furniturePiece: response.data } })
      })
  }
}

export function createFurniture ({make, model, year, description, price, image, material}) {
  const data = {make, model, year, description, price, image, material}

  return dispatch => {
    furnitureService
      .createFurniture(data)
      .then(response => {
        if (response.data.success) {
          dispatch({type: CREATE_FURNITURE})
          browserHistory.push('/furniture')
        } else {
          if (response.data.errors) {
            if (response.data.errors.make) {
              dispatch(furnitureError(response.data.errors.make))
            } else if (response.data.errors.model) {
              dispatch(furnitureError(response.data.errors.model))
            } else if (response.data.errors.year) {
              dispatch(furnitureError(response.data.errors.year))
            } else if (response.data.errors.description) {
              dispatch(furnitureError(response.data.errors.description))
            } else if (response.data.errors.price) {
              dispatch(furnitureError(response.data.errors.price))
            } else if (response.data.errors.image) {
              dispatch(furnitureError(response.data.errors.image))
            } else if (response.data.errors.material) {
              dispatch(furnitureError(response.data.errors.material))
            }
          } else {
            dispatch(furnitureError(response.data.message))
          }
        }
      })
  }
}

export function searchFurniture (searchStr, page) {
  return dispatch => {
    furnitureService
      .searchFurniture(searchStr, page)
      .then(response => {
        dispatch({type: SEARCH_FURNITURE, payload: { furniture: response.data }})
      })
  }
}

export function resetSearch () {
  return dispatch => {
    dispatch({type: RESET_FURNITURE_SEARCH})
  }
}

export function createFurnitureReview (furnitureId, review) {
  return dispatch => {
    furnitureService
      .addReview(furnitureId, review)
      .then(response => {
        if (response.data.success) {
          dispatch({type: CREATE_FURNITURE_REVIEW})
          dispatch(fetchFurnitureReviews(furnitureId))
        } else {
          if (response.data.errors) {
            if (response.data.errors.description) {
              dispatch(furnitureError(response.data.errors.description))
            } else if (response.data.errors.name) {
              dispatch(furnitureError(response.data.errors.name))
            }
          } else {
            dispatch(furnitureError(response.data.message))
          }
        }
      })
  }
}

export function fetchFurnitureReviews (furnitureId) {
  return dispatch => {
    furnitureService
      .getReviews(furnitureId)
      .then(response => {
        dispatch({type: FETCH_FURNITURE_REVIEWS, payload: {reviews: response.data}})
      })
  }
}

export function likeFurniture (furnitureId) {
  return dispatch => {
    furnitureService
      .likeFurniture(furnitureId)
      .then(response => {
        if (response.data.success) {
          dispatch({type: LIKE_FURNITURE})
        } else {
          dispatch(furnitureError(response.data.message))
        }
      })
  }
}

export function fetchUserFurniture () {
  return dispatch => {
    furnitureService
      .getUserFurniture()
      .then(response => {
        console.log(response.data)
        dispatch({ type: FETCH_USER_FURNITURE, payload: { furniture: response.data } })
      })
  }
}

export function removeFurniture (id) {
  return dispatch => {
    furnitureService
      .removeFurniture(id)
      .then(response => {
        console.log(response.data)
        dispatch({type: REMOVE_FURNITURE})
        dispatch(fetchUserFurniture())
      })
  }
}

export function furnitureError (error) {
  return dispatch => {
    dispatch({
      type: SET_ERROR,
      payload: error
    })
  }
}

const initialState = {
  all: [],
  searchResults: [],
  selected: null,
  selectedFurnitureReviews: [],
  userFurniture: []
}

// Reducer
export default function reducer (state = initialState, action) {
  switch (action.type) {
    case FETCH_FURNITURE:
      return Object.assign({}, state, { all: action.payload.furniture })
    case FETCH_FURNITURE_PIECE:
      return Object.assign({}, state, { selected: action.payload.furniturePiece })
    case FETCH_FURNITURE_REVIEWS:
      return Object.assign({}, state, { selectedFurnitureReviews: action.payload.reviews })
    case SEARCH_FURNITURE:
      return Object.assign({}, state, { searchResults: action.payload.furniture })
    case RESET_FURNITURE_SEARCH:
      return Object.assign({}, state, { searchResults: [] })
    case LIKE_FURNITURE:
      let updatedFurniture = Object.assign({}, state.selected)
      updatedFurniture['likes']++
      return Object.assign({}, state, { selected: updatedFurniture })
    case FETCH_USER_FURNITURE:
      return Object.assign({}, state, { userFurniture: action.payload.furniture })
    case CREATE_FURNITURE:
    case CREATE_FURNITURE_REVIEW:
    case REMOVE_FURNITURE:
    default:
      return state
  }
}
