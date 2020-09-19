import React, { Component } from 'react';
import Login from './chat/Login';
import MessagingPanel from './chat/MessagingPanel';

class App extends Component {
    state = {
        username: null
    }

    setUsername = (username) => {
        this.setState({username})
    }

    render()
    {
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
