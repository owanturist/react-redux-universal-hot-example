import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import surveyValidation from './surveyValidation';

function asyncValidate(data) {
  // TODO: figure out a way to move this to the server. need an instance of ApiClient
  if (!data.email) {
    return Promise.resolve({});
  }
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const errors = {};
      let valid = true;
      if (~['bobby@gmail.com', 'timmy@microsoft.com'].indexOf(data.email)) {
        errors.email = 'Email address already used';
        valid = false;
      }
      if (valid) {
        resolve();
      } else {
        reject(errors);
      }
    }, 1000);
  });
}

@reduxForm({
  form: 'survey',
  fields: ['name', 'email', 'occupation', 'currentlyEmployed', 'sex'],
  validate: surveyValidation,
  asyncValidate,
  asyncBlurFields: ['email']
})
export default
class SurveyForm extends Component {
  static propTypes = {
    active: PropTypes.string,
    asyncValidating: PropTypes.bool.isRequired,
    fields: PropTypes.object.isRequired,
    dirty: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired,
    valid: PropTypes.bool.isRequired
  }

  render() {
    const {
      asyncValidating,
      dirty,
      fields: {name, email, occupation, currentlyEmployed, sex},
      active,
      handleSubmit,
      invalid,
      resetForm,
      pristine,
      valid
      } = this.props;
    const renderInput = (field, label, showAsyncValidating) =>
      <div className={'form-group' + (field.error && field.touched ? ' has-error' : '')}>
        <label htmlFo className="col-sm-2">{label}</label>
        <div className={'col-sm-8 '}>
          {showAsyncValidating && asyncValidating && <i className={'fa fa-cog fa-spin '}/>}
          <input type="text" className="form-control" id={field.name} {...field}/>
          {field.error && field.touched && <div className="text-danger">{field.error}</div>}
          <div>
            {field.dirty && <span title="Dirty">D</span>}
            {field.active && <span title="Active">A</span>}
            {field.visited && <span title="Visited">V</span>}
            {field.touched && <span title="Touched">T</span>}
          </div>
        </div>
      </div>;

    return (
      <div>
        <form className="form-horizontal" onSubmit={handleSubmit}>
          {renderInput(name, 'Full Name')}
          {renderInput(email, 'Email', true)}
          {renderInput(occupation, 'Occupation')}
          <div className="form-group">
            <label htmlFor="currentlyEmployed" className="col-sm-2">Currently Employed?</label>
            <div className="col-sm-8">
              <input type="checkbox" id="currentlyEmployed" {...currentlyEmployed}/>
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-2">Sex</label>
            <div className="col-sm-8">
              <input type="radio" id="sex-male" {...sex} value="male" checked={sex.value === 'male'}/>
              <label htmlFor="sex-male">Male</label>
              <input type="radio" id="sex-female" {...sex} value="female" checked={sex.value === 'female'}/>
              <label htmlFor="sex-female">Female</label>
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <button className="btn btn-success" onClick={handleSubmit}>
                <i className="fa fa-paper-plane"/> Submit
              </button>
              <button className="btn btn-warning" onClick={resetForm} style={{marginLeft: 15}}>
                <i className="fa fa-undo"/> Reset
              </button>
            </div>
          </div>
        </form>

        <h4>Props from redux-form</h4>

        <table className="table table-striped">
          <tbody>
          <tr>
            <th>Active Field</th>
            <td>{active}</td>
          </tr>
          <tr>
            <th>Dirty</th>
            <td className={dirty ? 'success' : 'danger'}>{dirty ? 'true' : 'false'}</td>
          </tr>
          <tr>
            <th>Pristine</th>
            <td className={pristine ? 'success' : 'danger'}>{pristine ? 'true' : 'false'}</td>
          </tr>
          <tr>
            <th>Valid</th>
            <td className={valid ? 'success' : 'danger'}>{valid ? 'true' : 'false'}</td>
          </tr>
          <tr>
            <th>Invalid</th>
            <td className={invalid ? 'success' : 'danger'}>{invalid ? 'true' : 'false'}</td>
          </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
