import React, { Component } from 'react';
import axios from 'axios';
import { Grid } from '@material-ui/core';
//import './App.css';

import DisplayConversation from './DisplayConversation';
import MessagingBox from './MessagingBox';
import io from 'socket.io-client'

const socket = io.connect('http://localhost:4000')

class MessagingPanel extends Component {
    state = {
        messages: [],
        per: 6,
        page: 0,
        totalPages : null,
        scrolling : false
    }
    loadMessages = () => {
        const { per,page } = this.state;

        axios.get('/api/chatlist?per='+per+'&page='+page).then((response) => {
            this.setState({
                messages : [...this.state.messages,...response.data]
            })
        })
    }
    
    componentDidMount () {
        socket.emit('new-user', this.props.username );
        this.loadMessages();
        
        socket.on('message', ({username,message}) => {
            const data = { username,message }
            this.setState({messages: [data,...this.state.messages]})
        })

        socket.on('new-user', (message) => {
            const data = { username:'admin',message }
            this.setState({messages: [data,...this.state.messages]})
        })

        socket.on('user-leave',() => {
            const data = {  username: 'admin' }
            this.setState({messages: [data,...this.state.messages]})
        })
    }

    componentWillUnmount() {
        socket.emit('user-leave', this.props.username );
    }

    getMessage = (message) => {
        const data = { username: this.props.username, message : message }
        
        socket.emit('message', data)
    }

    loadMore =  (e) => {
        var top = document.getElementById('chat').scrollTop;
        var height = document.getElementById('chat').clientHeight;
        var scrollheight = document.getElementById('chat').scrollHeight;
        if (Math.abs(Math.round(top)) + height >= scrollheight) {
            this.setState(prevState => ({
                page: prevState.page + this.state.per
            }), this.loadMessages)
        }
    }

    render() {
        return (
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
            >
                <Grid item>
                    <DisplayConversation messages = { this.state.messages } loadMore= { this.loadMore } /><p />
                    <MessagingBox getMessage= { this.getMessage } />
                </Grid>
            </Grid>
        );
    }
}

export default MessagingPanel;
