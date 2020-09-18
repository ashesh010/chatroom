import React, { Component } from 'react';
import { Button,TextField,Grid } from '@material-ui/core';
import './App.css';

class MessagingBox extends Component {
    messageHandler = (e) => {
        if(e.keyCode === 13) {
            e.preventDefault()
            this.props.getMessage(e.target.value)
            e.target.value = ""
        }
    }
    
    render() {
        return (
            <Grid
                container
                direction="row"
                >
                <Grid item xs>
                    <TextField label="Message" variant="outlined" multiline onKeyDown={ this.messageHandler } style={{ width:'100%'}} />
                </Grid>
                &emsp;<Button variant="contained" color="primary" type="submit">Send</Button>
            </Grid>
        );
    }
}

export default MessagingBox;
