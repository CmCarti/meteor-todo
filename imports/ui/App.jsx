import React, { Component } from 'react';
import ReactDOM from 'react-dom';
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
    handleSubmit(event) {
        event.preventDefault();

        // Find the text field via the React ref
        const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

        // Insert text into the DB
        Tasks.insert({
            text,
            createdAt: new Date(),
        });

        // Clear form
        ReactDOM.findDOMNode(this.refs.textInput).value = '';
    }
    render() {
        return (
            <div className="container">
                <header>
                    <h1>Todo List</h1>
                    <form onSubmit={this.handleSubmit.bind(this)} className="new-task">
                        <input type="text"
                            ref="textInput"
                            placeholder="Type to add new tasks"
                        />
                    </form>
                    
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