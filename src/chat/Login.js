import React, { Component } from 'react';
import { Button,TextField,Grid, Card } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import axios from'axios'

/**
 * Login Component
 */
class Login extends Component {
    state = {
        userExists : false
    }
    
    login = (e) => {
        e.preventDefault();
        var username = e.target.username.value
        axios.post('/api/checkUserExists', { username }).then((response) => {
            //check if user exists
            if(response.data === false) {
                this.props.setUsername(username)
            } else {
                this.setState({ userExists : true })
            }
        })
    }
    
    showMessage = ((message) =>
        <Alert severity="error">{ message }</Alert>
    )

    render() {
        /* Returns a login form with a username textfield */
        return (
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                spacing={2}
            >
                <Grid item>
                    <h1>Chat Room</h1>
                    <Card style={{ borderTop : '2px solid blue' }}>
                        {(this.state.userExists) ? this.showMessage("User name already taken !!") : '' }
                        <form onSubmit={ this.login } style={{ margin:'25px' }}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Choose a username"
                                name="username"
                                autoComplete="username"
                                autoFocus
                            />
                            <Button variant="contained" color="primary" type="submit">Login</Button>
                        </form>
                    </Card>
                </Grid>
            </Grid>
        );
    }
}

export default Login;
