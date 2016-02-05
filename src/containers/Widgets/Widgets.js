import React, { Component, PropTypes } from 'react';
import DocumentMeta from 'react-document-meta';
import { connect } from 'react-redux';
import * as widgetActions from 'reducers/widgets';
import { load as loadWidgets } from 'reducers/widgets';
import { editStart, editStop, isLoaded } from 'actions/widgets';
import { initializeWithKey } from 'redux-form';
import connectData from 'helpers/connectData';
import { WidgetForm } from 'components';
import config from '../../config';

function fetchDataDeferred(getState, dispatch) {
    if (!isLoaded(getState())) {
        return dispatch(loadWidgets());
    }
}

@connectData(null, fetchDataDeferred)
@connect(
    state => ({
        widgets: state.widgets.data,
        editing: state.widgets.editing,
        error: state.widgets.error,
        loading: state.widgets.loading
    }), {
        ...widgetActions,
        initializeWithKey,
        editStart,
        editStop
    }
)
export default class Widgets extends Component {
    static propTypes = {
        widgets: PropTypes.array,
        error: PropTypes.string,
        loading: PropTypes.bool,
        initializeWithKey: PropTypes.func.isRequired,
        editing: PropTypes.object.isRequired,
        load: PropTypes.func.isRequired,
        editStart: PropTypes.func.isRequired
    }

    render() {
        const handleEdit = (widget) => {
            const {editStart} = this.props; // eslint-disable-line no-shadow
            return () => editStart(String(widget.id));
        };
        const {widgets, error, editing, loading, load} = this.props;
        let refreshClassName = 'fa fa-refresh';
        if (loading) {
            refreshClassName += ' fa-spin';
        }
        return (
            <div className={' container'}>
                <h1>
                    Widgets
                    <button className={' btn btn-success'} onClick={load}>
                        <i className={refreshClassName}/> {' '} Reload Widgets
                    </button>
                </h1>
                <DocumentMeta title={config.app.title + ': Widgets'}/>
                <p>
                    If you hit refresh on your browser, the data loading will take place on the server before the page is returned.
                    If you navigated here from another page, the data was fetched from the client after the route transition.
                    This uses the static method <code>fetchDataDeferred</code>. To block a route transition until some data is loaded, use <code>fetchData</code>.
                    To always render before loading data, even on the server, use <code>componentDidMount</code>.
                </p>
                <p>
                    This widgets are stored in your session, so feel free to edit it and refresh.
                </p>
                {error &&
                    <div className="alert alert-danger" role="alert">
                        <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                        {' '}
                        {error}
                    </div>}
                        {widgets && widgets.length &&
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Color</th>
                                        <th>Sprockets</th>
                                        <th>Owner</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        widgets.map((widget) => editing[widget.id] ?
                                        <WidgetForm formKey={String(widget.id)} key={String(widget.id)} initialValues={widget}/> :
                                        <tr key={widget.id}>
                                            <td>{widget.id}</td>
                                            <td>{widget.color}</td>
                                            <td>{widget.sprocketCount}</td>
                                            <td>{widget.owner}</td>
                                            <td>
                                                <button className="btn btn-primary" onClick={handleEdit(widget)}>
                                                    <i className="fa fa-pencil"/> Edit
                                                </button>
                                            </td>
                                        </tr>)
                                    }
                    </tbody>
                </table>}
            </div>
        );
    }
}
