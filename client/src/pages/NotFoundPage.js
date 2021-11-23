import { Container, Row, Col } from 'react-bootstrap' 
import { Link } from 'react-router-dom'
import "./syles.css"


export default function NotFoundPage() {
    return (
        <Container  id="notFoundContainer">
            <Row>
                <Col
                md={{
                    span: 6,
                    offset: 3
                }} 
                className="text-center">
                    <img
                    id="notFoundImg"
                    src="/img/404.svg" alt="error-404"/>
                    <h2>¿ Te has perdido ?</h2>
                    <p>
                        Vuelve al <Link to={"/"}> Inicio</Link>
                    </p>
                </Col>
            </Row>
        </Container>
    )
}
