import axios from "axios";
import React from 'react'
import {APIHOST as url } from '../api.json'
import { Container, Form, Row, Col, Button } from "react-bootstrap";


export default class RegisterPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      user:"",
      password: ""  

     }
  }
  register(){   
    axios.post(`${url}/user/register/`, {
      user: this.state.user,
      password: this.state.password
    }).then( response => {
      window.location.href = '/login'       
    }).catch(error => {
      console.log(error)
    })
  }

  render() { 

    return ( 
      <Container id="ContainerLogin">
      <Row>
        <Col>
          <Row>
            <h2>Formulario de Registro</h2>
          </Row>
          <Row>
            <Col
              sm="12"
              xs="12"
              md={{ span: 4, offset: 4 }}
              lg={{ span: 4, offset: 4 }}
              xl={{ span: 4, offset: 4 }}
            >
              <Form >
                <Form.Group className="mb-3">
                  <Form.Label>Usuario</Form.Label>
                  <Form.Control
                    onChange={(e) => this.setState({ user: e.target.value })}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    onChange={(e) =>
                      this.setState({ password: e.target.value })
                    }
                  />
                </Form.Group>
                <Button variant="primary" onClick={() => this.register()}>
                  Registrarse
                </Button>
              </Form>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
     );
  }
}
 


