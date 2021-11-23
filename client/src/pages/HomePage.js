import { Container, Button, Row, Col } from 'react-bootstrap' 
import { Link } from 'react-router-dom'

export default function HomePage() {
    return (
        <Container id="ContainerHome">
            <Row className="mt-5">
                <Col xs={{ span:12 }} md={{ span:6 }} className="mb-5">
                    <h2>Bienvenid@ al Administrador de Presupuesto</h2>
                    <p>¡Aquí podrás administrar tu presupuesto!</p>
                    <p>Agrega tus ingresos y egresos</p>

                    <div>
                        <Link to={"/login"}>Ingresa </Link> o                         
                        <Button as={Link} to={"/register"} className="ms-1"> Crea una Cuenta</Button>
                    </div>
                </Col>
                <Col >
                    <img className="img-fluid" src="/img/home_image.svg" alt="home"></img>
                    <p>¡Mejora tus finanzas!</p>
                </Col>
            </Row>
        </Container>
    )
}
