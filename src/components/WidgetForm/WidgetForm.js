import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import widgetValidation, { colors } from './widgetValidation';
import { editStop, save } from 'actions/widgets';

@connect(
    state => ({
        saveError: state.widgets.saveError
    }), {
        editStop,
        save
    }
)
@reduxForm({
    form: 'widget',
    fields: ['id', 'color', 'sprocketCount', 'owner'],
    validate: widgetValidation
})
export default class WidgetForm extends Component {
    static propTypes = {
        fields: PropTypes.object.isRequired,
        editStop: PropTypes.func.isRequired,
        handleSubmit: PropTypes.func.isRequired,
        invalid: PropTypes.bool.isRequired,
        pristine: PropTypes.bool.isRequired,
        save: PropTypes.func.isRequired,
        submitting: PropTypes.bool.isRequired,
        saveError: PropTypes.object,
        formKey: PropTypes.string.isRequired,
        values: PropTypes.object.isRequired
    };

    render() {
        const { fields: {id, color, sprocketCount, owner}, formKey, handleSubmit, invalid,
        pristine, submitting, saveError: { [formKey]: saveError }, values } = this.props;

        return (
            <tr>
                <td>{id.value}</td>
                <td>
                    <select name="color" className="form-control" {...color}>
                        {colors.map(valueColor => <option value={valueColor} key={valueColor}>{valueColor}</option>)}
                    </select>
                    {color.error && color.touched && <div className="text-danger">{color.error}</div>}
                </td>
                <td>
                    <input type="text" className="form-control" {...sprocketCount}/>
                    {sprocketCount.error && sprocketCount.touched && <div className="text-danger">{sprocketCount.error}</div>}
                </td>
                <td>
                    <input type="text" className="form-control" {...owner}/>
                    {owner.error && owner.touched && <div className="text-danger">{owner.error}</div>}
                </td>
                <td>
                    <button className="btn btn-default"
                        onClick={() => this.props.editStop(formKey)}
                        disabled={submitting}>
                        <i className="fa fa-ban"/> Cancel
                    </button>
                    <button className="btn btn-success"
                        onClick={handleSubmit(() => this.props.save(values))}
                        disabled={pristine || invalid || submitting}>
                        <i className={'fa ' + (submitting ? 'fa-cog fa-spin' : 'fa-cloud')}/> Save
                    </button>
                    {saveError && <div className="text-danger">{saveError}</div>}
                </td>
            </tr>
        );
    }
}
