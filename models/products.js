'use strict';

const DataModel = require('./memory');

class Products extends DataModel {
  constructor() {
    super();
    this.schema = {
      category_id: { type: 'string', required: true },
      price: { type: 'number', required: true },
      weight: { type: 'number' },
      quantity_in_stock: { type: 'number', required: true },
    };
  }
}

module.exports = Products;