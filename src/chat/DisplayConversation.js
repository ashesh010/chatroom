import React, { Component, Fragment } from 'react';
import { Card, List,ListItem, Avatar,ListItemText, Chip } from '@material-ui/core';

var cnt = 1;
var itemStyle = {
    transform:'rotate(180deg)',
    direction: 'ltr',
}

/**
 * DisplayConversation Component to display chat history
 * 
 */
class DisplayConversation extends Component {
    /**
     * Load list of chats fetched from database into the UI
     */
    displayMessage = () => this.props.messages.map(message => 
        (message.userid !== this.props.userid) ? (    
            <List dense key={ cnt++ } style = { itemStyle }>
                <small style={{ float:'left',marginLeft : '20px', marginBottom : '-5px' }}>{ message.username }</small>
                <ListItem alignItems="flex-start">
                    <ListItemText primary={<Chip avatar={<Avatar>{ message.username.substring(0,1) }</Avatar>} label={ message.message } color="primary" variant="outlined"/>} ></ListItemText>
                </ListItem>
                
            </List>
        ) : (
            <List dense key={ cnt++ } style = { itemStyle }>
                <small style={{ float: 'right', marginRight : '20px', marginBottom : '-5px' }}>{ message.username }</small>
                <ListItem style = {{ transform:'rotate(180deg)'}}>
                    <ListItemText primary={<Chip style={{ transform:'rotate(180deg)'}} avatar={<Avatar>{ message.username.substring(0,1) }</Avatar>} label={ message.message } color="secondary" variant="outlined"/>} ></ListItemText>
                </ListItem>
                
            </List>
        )
    )
    
    render() {
        var cardStyle = {
            borderTop : '2px solid blue',
            width: '600px',
            height: '400px',
            transform:'rotate(180deg)',
            direction: 'rtl',
            overflowY : 'auto',
        }
 
        return (
            /* Returns a fragment with the chat history */
            <Fragment>
                <h2>Welcome to Chat Room <small>{( this.props.loading) ? <Chip label="Loading..." color="primary" variant="outlined" size="small"/> : '' }</small></h2>
                
                <Card style={cardStyle} id="chat" onScroll = { this.props.loadMore }>
                    { this.displayMessage() }
                </Card>
            </Fragment>
        );
    }
}

export default DisplayConversation;
