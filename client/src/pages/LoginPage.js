import React from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import axios from 'axios'
import {APIHOST as url} from '../api.json'
import {isNull } from 'util'

export default class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      user: "",
      password: "",
      login: null,
      store: null
     }
  }

  login(){
    axios.post(`${url}/user/login/`, {
      user: this.state.user,
      password: this.state.password
    }).then( response => {
      if(isNull(response.data.token)){
        alert("Datos no validos")
      }else{
        localStorage.setItem('login', JSON.stringify({
          user:  this.state.user,
          login:true,
          token:response.data.token
        }))
        window.location.href = '/balances'        
      }
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
            <h2>Iniciar Sesión</h2>
          </Row>
          <Row>
            <Col
              sm="12"
              xs="12"
              md={{ span: 4, offset: 4 }}
              lg={{ span: 4, offset: 4 }}
              xl={{ span: 4, offset: 4 }}
            >
              <Form>
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
                <Button variant="primary" onClick={() => this.login()}>
                  Iniciar Sesión
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
 
 

