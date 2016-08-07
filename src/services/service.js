'use strict'

class Service {
  constructor(collection) {
    this.collection = collection
    this.collection = {}
  }

  getAll() {
    return this.collection
  }

  getById() {}
}

module.exports = Service
