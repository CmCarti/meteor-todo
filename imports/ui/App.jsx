import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';

import Task from './Task.jsx';

import { Tasks } from '../api/tasks.js';

// App component -represents the whole app
class App extends Component {
    
    renderTasks(){
        return this.props.tasks.map((task) => (
            <Task key={task._id} task={task} />
        ));
    }

    render() {
        return (
            <div className="container">
                <header>
                    <h1>Todo List</h1>
                </header>

                <ul>
                    {this.renderTasks()}
                </ul>

            </div>
        );
    }
}

App.propTypes = {
    // require the tasks prop
    tasks: PropTypes.array.isRequired,
};
    // Wrap App in the tasks container, give it the tasks prop
export default createContainer(() => {

    return {
        tasks: Tasks.find({}).fetch(),
    };
}, App);