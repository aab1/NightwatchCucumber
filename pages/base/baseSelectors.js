const { FloatingActionComponent } = require('../../components/floatingActionComponent');
const { PatientSearcherComponent } = require('../../components/patientSearcherComponent');
const { BasicComponent } = require('../../components/basicComponent');
const { InputTextComponent } = require('../../components/inputComponent');

module.exports = {
  base_textField: {
    search: new InputTextComponent('css selector', 'input#headerSearch'), 
  },
 
 
};
