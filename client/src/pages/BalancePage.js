// import { axios } from "axios";
import React from "react";
import { Container, Table, Button, Form } from "react-bootstrap";
import Moment from "react-moment";
import { APIHOST as url } from "../api.json";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";

export default class Balance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      balanceData: false,
      modalState: false,
      modalEditedState: false,
      concept: "",
      amount: "",
      date: "",
      type: "",
      id:""
    };
  }

  showModal = () => {
    this.setState({ modalState: true });
  };

  closeModal = () => {
    this.setState({ modalState: false });
  };

  showModalEdited = (balance) => {    
    this.setState({
      modalEditedState: true,
      id: balance._id,
      amount: balance.amount,
      date: balance.date,
      concept: balance.concept,
      type: balance.type,
    });
  };

  deletedItem = (balance) => {
    const id = balance._id;
    const order_url = url + "/balance/" + id;
    let user = JSON.parse(localStorage.getItem("login"));

    fetch(order_url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + user.token,
      },
    })
      .then((data) => {
        this.loadData();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  closeModalEdited = () => {
    this.setState({ modalEditedState: false });
  };

  loadData() {
    const order_url = url + "/balance/";
    let user = JSON.parse(localStorage.getItem("login"));

    const headers = new Headers({
      Authorization: "Token " + user.token,
      "Content-Type": "application/x-www-form-urlencoded",
    });

    fetch(order_url, {
      headers: headers,
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          balanceData: data,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  totalQuantityCalc() {
    let aux = 0;
    this.state.balanceData.forEach((element) => {
      if (element.type === "Ingreso") {
        aux = aux + element.amount;
      } else {
        aux = aux - element.amount;
      }
    });
    return aux;
  }

  componentDidMount() {
    this.loadData();
  }

  update() {
    const id = this.state.id;
    const order_url = url + "/balance/"+ id;
    let user = JSON.parse(localStorage.getItem("login"));

    const data = {
      concept: this.state.concept,
      amount: this.state.amount,
      date: this.state.date,
    };

    if (
      data.amount === "" ||
      data.date === "" ||
      data.concept === "" 
    ) {
      alert("Todos los campos son requeridos");
    } else {
      fetch(order_url, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + user.token,
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => {
          this.loadData();
          this.closeModalEdited();
          this.setState({    
            id: "",           
          });
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }

  save() {
    const order_url = url + "/balance/";
    let user = JSON.parse(localStorage.getItem("login"));

    const data = {
      concept: this.state.concept,
      amount: this.state.amount,
      date: this.state.date,
      type: this.state.type,
    };

    if (
      data.amount === "" ||
      data.date === "" ||
      data.concept === "" ||
      data.type === ""
    ) {
      alert("Todos los campos son requeridos");
    } else {
      fetch(order_url, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + user.token,
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => {
          this.loadData();
          this.closeModal();
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }

  render() {
    const { balanceData } = this.state;

    if (!balanceData) {
      return (
        <Container id="ContainerBalance">
          <div>Cargando.....</div>
        </Container>
      );
    } else {
      return (
        <Container id="ContainerBalance">
          <div>
            <Button
              className="btn-success"
              id="Button"
              onClick={() => this.showModal()}
            >
              Agregar Movimiento
            </Button>
          </div>
          <Table bordered hover>
            <thead>
              <tr>
                <th>Concepto</th>
                <th>Fecha</th>
                <th>Tipo</th>
                <th>Monto</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {balanceData.map((balance) => (
                <tr key={balance._id}>
                  <td>{balance.concept}</td>
                  <td>
                    <Moment format="DD/MM/YYYY">{balance.date}</Moment>
                  </td>
                  <td>{balance.type}</td>
                  <td>{balance.amount}</td>
                  <td className="pb-0">
                    <Button
                      className="btn btn-primary me-1 mb-1"
                      onClick={() => this.showModalEdited(balance)}
                    >
                      Editar
                    </Button>
                    <Button
                      className="btn btn-danger mb-1"
                      onClick={() => this.deletedItem(balance)}
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan="2"></td>
                <td>
                  <b>Total</b>
                </td>
                <td>{this.totalQuantityCalc()}</td>
                <td></td>
              </tr>
            </tbody>
          </Table>

          <Modal centered isOpen={this.state.modalState}>
            <ModalHeader toggle={() => this.closeModal()}>
              Guardar Movimiento
            </ModalHeader>
            <ModalBody>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Concepto</Form.Label>
                  <Form.Control
                    onChange={(e) => this.setState({ concept: e.target.value })}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Fecha</Form.Label>
                  <Form.Control
                    type="date"
                    onChange={(e) => this.setState({ date: e.target.value })}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Tipo</Form.Label>
                  <Form.Select
                    defaultValue=""
                    onChange={(e) => this.setState({ type: e.target.value })}
                  >
                    <option></option>
                    <option>Ingreso</option>
                    <option>Egreso</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Monto</Form.Label>
                  <Form.Control
                    type="number"
                    onChange={(e) => this.setState({ amount: e.target.value })}
                  />
                </Form.Group>
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={() => this.save()}>
                Guardar
              </Button>{" "}
              <Button onClick={() => this.closeModal()}>Cancelar</Button>
            </ModalFooter>
          </Modal>

          <Modal centered isOpen={this.state.modalEditedState}>
            <ModalHeader toggle={() => this.closeModalEdited()}>
              Guardar Movimiento
            </ModalHeader>
            <ModalBody>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Concepto</Form.Label>
                  <Form.Control
                    value={this.state.concept}
                    onChange={(e) => this.setState({ concept: e.target.value })}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Fecha</Form.Label>
                  <Form.Control
                    value={this.state.date}
                    type="date"
                    onChange={(e) => this.setState({ date: e.target.value })}
                  />
                </Form.Group>                

                <Form.Group className="mb-3">
                  <Form.Label>Monto</Form.Label>
                  <Form.Control
                    value={this.state.amount}           
                    type="number"
                    onChange={(e) => this.setState({ amount: e.target.value })}
                  />
                </Form.Group>
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={() => this.update()}>
                Guardar
              </Button>{" "}
              <Button onClick={() => this.closeModalEdited()}>Cancelar</Button>
            </ModalFooter>
          </Modal>
        </Container>
      );
    }
  }
}
