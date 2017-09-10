import { BASE_URL } from '../api'
import requester from '../requester'

const resourceUrl = `${BASE_URL}/furniture`

function getFurniture (page = 1) {
  const serviceUrl = `${resourceUrl}/all?page=${page}`
  return requester.get(serviceUrl)
}

function getFurniturePiece (id) {
  const serviceUrl = `${resourceUrl}/details/${id}`
  return requester.get(serviceUrl, true)
}

function createFurniture (furniturePiece) {
  const serviceUrl = `${resourceUrl}/create`
  return requester.post(serviceUrl, furniturePiece, true)
}

function searchFurniture (searchStr, page) {
  const serviceUrl = `${resourceUrl}/all?search=${searchStr}&page=${page}`
  return requester.get(serviceUrl, true)
}

function addReview (id, review) {
  const serviceUrl = `${resourceUrl}/details/${id}/reviews/create`
  return requester.post(serviceUrl, review, true)
}

function getReviews (id) {
  const serviceUrl = `${resourceUrl}/details/${id}/reviews`
  return requester.get(serviceUrl, true)
}

function likeFurniture (id) {
  const serviceUrl = `${resourceUrl}/details/${id}/like`
  return requester.post(serviceUrl, {}, true)
}

function getUserFurniture () {
  const serviceUrl = `${resourceUrl}/mine`
  return requester.get(serviceUrl, true)
}

function removeFurniture (id) {
  const serviceUrl = `${resourceUrl}/delete/${id}`
  return requester.post(serviceUrl, {}, true)
}

export default {
  getFurniture,
  getFurniturePiece,
  createFurniture,
  searchFurniture,
  addReview,
  getReviews,
  likeFurniture,
  getUserFurniture,
  removeFurniture
}
