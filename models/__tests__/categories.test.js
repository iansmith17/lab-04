const Categories = require('../categories/categories.js');
const Products = require('../products.js');

const models = [];
models.push(Categories);
models.push(Products);

for(let modelIndex in models) {
  let model;
  describe(`Testing model ${modelIndex}`, () => {
    beforeEach(() => {
      model = new models[modelIndex]();
    });

    // How might we repeat this to check on types?
    it('sanitize() returns undefined with missing requirements', () => {
      const schema = model.schema;
      var testRecord = {};
      for (var field in schema) {
        if (schema[field].required) {
          testRecord[field] = null;
        }
      }
      expect(model.validate.isValid(testRecord)).toBe(false);
    });

    it('can post()', () => {
      let obj = { name: 'Test' };
      return model.create(obj)
        .then(record => {
          Object.keys(obj).forEach(key => {
            expect(record[key]).toEqual(obj[key]);
          });
        })
        .catch(e => console.error('ERR', e));
    });

    it('can get()', () => {
      let obj = { name: 'Test' };
      return model.create(obj)
        .then(record => {
          return model.get(record._id)
            .then(record => {
              Object.keys(obj).forEach(key => {
                expect(record[0][key]).toEqual(obj[key]);
              });
            });
        });
    });

    it('can delete()', () => {
      let obj = { name: 'Sacrificial Object' };
      return model.create(obj)
        .then(record => {
          return model.delete(record._id)
            .then(result => {
              expect(result).toBe(true);
              expect(model.get(record._id)._id).toBeUndefined();
            });
        });
    });

    it('can update()', () => {
      let obj = { name: 'Thing to change' };
      return model.create(obj)
        .then(record => {
          entry = {
            id: record.id,
            name: 'Thing has been changed'
          };
          return model.update(record._id, entry)
            .then(result => {
              expect(result.name).toEqual('Thing has been changed');
              expect(result._id).toEqual(record._id);
            });
        });
    });
  })};