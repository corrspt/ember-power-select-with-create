import DS from 'ember-data';

export default DS.Model.extend({
  specification: DS.belongsTo('base-material-specification')

});
