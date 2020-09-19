import React, { Component } from 'react';
import './App.css';
import { Button,TextField,Grid, Card } from '@material-ui/core';

class Login extends Component {
    
    login = (e) => {
        e.preventDefault();
        this.props.setUsername(e.target.username.value)
    }

    render() {
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
