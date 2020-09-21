import React, { Component } from 'react';
import { Card, CardContent, CardHeader } from '@material-ui/core';

class OnlineUserList extends Component {
    render() {
        return (
            <Card style={{ borderBottom : '2px solid blue' }}>
                <CardHeader title="Online users" />
                <CardContent>
                    { this.props.users.map((user) => 
                        <li key={user.userid}>{user.username}</li>
                    )}
                </CardContent>
            </Card>
        );
    }
}

export default OnlineUserList;