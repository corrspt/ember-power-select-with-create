import { later } from '@ember/runloop';
import { Promise } from 'rsvp';
import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import RSVP from 'rsvp';

export default Controller.extend({
  store: service(),
  baseMaterial: null,

  init() {
    this._super(...arguments);
    this.set('baseMaterial', this.get('store').createRecord('base-material'));
  },

  // Actions
  actions: {

    setSpecification(spec) {
      this.set('baseMaterial.specification', spec);
      this.set('specificationsSearched', null);
    },

    suggestSpecification(/*term*/) {
      'Add this';
    },

    createSpecification(/*term*/) {
      // Can be empty, does not need to work
    },

    searchSpecification(/*term*/) {
      let results = [];
      results.push(this.get('store').createRecord('base-material-specification', {
        'specification': 'SA 1008',
      }));
      results.push(this.get('store').createRecord('base-material-specification', {
        'specification': 'SA 1010',
      }));
      this.set('results', results);
      return new RSVP.Promise((resolve, reject) => {
        this.createSlowPromise(results).then((materials) => {
          resolve(materials);
        }, reject);
      });
    },

    showWhenCreateSpec() {
      let specs = this.get('specificationsSearched');
      if (specs != null) {
        if (specs.get('length') === 0) {
          return true;
        }
      }
      return false;
    }
  },

  createSlowPromise(results) {
    return new Promise(function(resolve) {
      later(() => resolve(results), 100);
    });
  },
});
