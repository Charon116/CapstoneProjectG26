import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';

class ManageSchedule extends Component {
    render() {

        return (
            <React.Fragment>
                <div>manage schedule</div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        ManageScheduleMenuPath: state.app.ManageScheduleMenuPath

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
