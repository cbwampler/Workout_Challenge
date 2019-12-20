import React, { useState} from 'react'; 
import './Example.css';
import {Container, Row, Col} from 'reactstrap'


function Example(){
    let [username,setUsername] = useState('Jeremiah')  //array deconstruction with useState

    function buttonFunc(){
    console.log('username:', username)
    setUsername ('Jason Todd')
    console.log('username:', username)
    }
    return (
        <Container>
            <Row>
                <h2>Sign In</h2>
                <Col sm="6">
                    <input onChange={(e) => {setUsername(e.target.value)}} type="text" name="username" value={username}/>
                </Col>
                <Col sm="6"><h3>Welcome to React!</h3></Col>
            </Row>
            <h1>
                {username}
            </h1>

        </Container>

    )
}

export default Example
