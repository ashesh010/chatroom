import React, { Component, Fragment } from 'react';
import { Card, List,ListItem,ListItemAvatar, Avatar,ListItemText, Chip } from '@material-ui/core';

var cnt = 1;
class DisplayConversation extends Component {
    displayMessage = () => this.props.messages.map(message => 
        (message.username !== undefined) ? (    
            <List dense key={ cnt++ }>
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
            width: '600px',
            transitionDuration: '0.3s',
            height: '400px',
            overflowY : 'auto',
            display:'flex',
            flexDirection:'column-reverse',
            marginTop : '50px',
            borderTop : '2px solid blue'
        }
        return (
            <Fragment>
            <h2>Welcome to Chat Room</h2>
            <Card style={cardStyle} id="chat" onScroll = { this.props.loadMore }>
                { this.displayMessage() }
            </Card>
            </Fragment>
        );
    }
}

export default DisplayConversation;
