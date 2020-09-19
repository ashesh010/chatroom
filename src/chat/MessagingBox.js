import React, { Component } from 'react';
import { Button,TextField,Grid } from '@material-ui/core';

class MessagingBox extends Component {
    messageHandler = (e) => {
        if(e.target.type === 'textarea') {
            if(e.keyCode === 13) {
                e.preventDefault()
                this.props.getMessage(e.target.value)
                e.target.value = ""
            }
        } else{
            e.preventDefault()
            this.props.getMessage(e.target.message.value)
            e.target.message.value = ""
        }
    }

    render() {
        return (
            <form onSubmit={ this.messageHandler }>
                <Grid
                    container
                    direction="row"
                    >
                        <Grid item xs>
                            <TextField label="Message" variant="outlined" multiline onKeyDown={ this.messageHandler } style={{ width:'100%'}} name="message"/>
                        </Grid>
                        &emsp;<Button variant="contained" color="primary" type="submit">Send</Button>
                </Grid>
            </form>
        );
    }
}

export default MessagingBox;
