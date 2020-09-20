import React, { Component } from 'react';
import Login from './chat/Login';
import MessagingPanel from './chat/MessagingPanel';

class App extends Component {
    /* Initial state */
    state = {
        username: null
    }

    /**
     * Set username of logged in user in state
     * @param {string} username 
     */
    setUsername = (username) => {
        this.setState({username})
    }

    render() {
        /* Returns a div with a login component or a Messaging component based on the username state */ 
        return (
            <div className="app">
                { !this.state.username ?
                    <Login setUsername = { this.setUsername } />
                    :
                    <MessagingPanel username = { this.state.username }/>
                }
            </div>
        );
    }
}

export default App;
