import React, { Component, Fragment } from 'react';
import { Card, List,ListItem,ListItemAvatar, Avatar,ListItemText, Chip } from '@material-ui/core';

var cnt = 1;
var itemStyle = {
    transform:'rotate(180deg)',
    direction: 'ltr',
}
class DisplayConversation extends Component {
    
    displayMessage = () => this.props.messages.map(message => 
        (message.username !== undefined) ? (    
            <List dense key={ cnt++ } style = { itemStyle }>
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar />
                    </ListItemAvatar>
                    <ListItemText primary={<Chip label={ message.message } />} secondary={ message.username }></ListItemText>
                </ListItem>
                
            </List>
        ) : ('')
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
