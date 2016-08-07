'use strict'

class Collection {
  constructor(name, data) {
    this.name = name
    this.data = {}
    this.mockData = data
    this.setData()
  }

  // Get collection from firebase, otherwise use mock data.
  setData() {
    // Get collection from firebase

    // Use mock data
    this.data = this.mockData
    console.warn('using mock data for', this.name)
  }

  getAll() {
    return this.data
  }

  getById() {}
}

module.exports = Collection
