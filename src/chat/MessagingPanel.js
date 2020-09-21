import React, { Component } from 'react';
import axios from 'axios';
import { Grid,Chip } from '@material-ui/core';
//import './App.css';

import DisplayConversation from './DisplayConversation';
import MessagingBox from './MessagingBox';
import io from 'socket.io-client'
import OnlineUserList from './OnlineUserList';

const socket = io.connect('http://localhost:4000')

class MessagingPanel extends Component {
    /* Initial state */
    state = {
        userid: null,
        messages: [],
        per: 6,
        page: 0,
        totalPages : null,
        scrolling : false,
        loading : false,
        users: []
    }

    /**
     * Load chats from mongo collection.
     *
     * @param {integer} per
     * @param {integer} page
     */
    loadMessages = () => {
        const { per,page } = this.state;
        
        axios.get('/api/chatlist?per='+per+'&page='+page).then((response) => {
            this.setState({
                loading : false,
                messages : [...this.state.messages,...response.data]
            })
        })
    }
    
    /**
     * Handle user leaving chat room
     */
    componentCleanup() {
        /* User leaving chat room */
        socket.emit('user-leave', {userid: this.state.userid, username:this.props.username} );
    }

    componentDidMount () {
        /* Generate user id from socket */
        socket.emit('user-id');
        /* New user in chat room */
        socket.emit('new-user', this.props.username );
        /* load chat history messages */
        this.loadMessages();
        
        /* Listen for user id*/
        socket.on('user-id', id => {
            this.setState({ userid : id })
        })

        /* Listen for online users */
        socket.on("users", users => {
            this.setState({ users : users })
        })

        /* Listen for message */
        socket.on('message', ({userid,username,message}) => {
            const data = { userid,username,message }
            this.setState({messages: [data,...this.state.messages]})
        })

        /* Listen for new user in chat room */
        socket.on('new-user', (message) => {
            const data = { username:'admin',message }
            this.setState({messages: [data,...this.state.messages]})
        })

        /* Listen for user leaving chat room */
        socket.on('user-leave',(message) => {
            const data = {  username: 'admin',message }
            this.setState({
                messages: [data,...this.state.messages],
            })
        })
        
        /* Handle browser tab close event*/
        window.addEventListener('beforeunload', (e) => {
            e.preventDefault();
            this.componentCleanup()
        });
    }
    
    componentWillUnmount() {
        window.removeEventListener('beforeunload', this.componentCleanup);
    }

    /**
     *  Get user entered message from chat.
     * 
     * @param {string} message 
     */
    getMessage = (message) => {
        const data = { userid: this.state.userid, username: this.props.username, message : message }
        /* Message from user */
        socket.emit('message', data)
    }

    /**
     * Lazy loading chat history
     * @param {*} e 
     */
    loadMore =  (e) => {
        var top = document.getElementById('chat').scrollTop;
        var height = document.getElementById('chat').clientHeight;
        var scrollheight = document.getElementById('chat').scrollHeight;
        if (Math.abs(Math.round(top)) + height >= scrollheight) {
            this.setState(prevState => ({
                loading: true,
                page: prevState.page + this.state.per
            }), this.loadMessages)
        }
    }

    render() {
        /* Returns a grid containin the chat converstaions and a message box to send message */
        return (
            <Grid
                container
                direction="row"
                justify="center"
                spacing = {2}
            >
                <Grid item xs={12} style={{ textAlign: 'center'}}>
                    <h2>Welcome to Chat Room <small>{( this.state.loading) ? <Chip label="Loading..." color="primary" variant="outlined" size="small"/> : '' }</small></h2>
                </Grid>
                <Grid item xs={2}>
                    <OnlineUserList users={ this.state.users }/>
                </Grid>
                <Grid item>
                    <DisplayConversation messages = { this.state.messages } loadMore= { this.loadMore } loading = { this.state.loading } userid = { this.state.userid }/><p />
                    <MessagingBox getMessage= { this.getMessage } />
                </Grid>
            </Grid>
        );
    }
}

export default MessagingPanel;
