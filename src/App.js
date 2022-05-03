/* eslint-disable jsx-a11y/alt-text */
import './App.css';
import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Col, Container, Label, Row } from 'reactstrap';
import { useState } from 'react';


function App() {

  const apiUrl = 'https://ar-holdings-dev-test.myshopify.com/admin/api/2022-04/products.json';
  const [appState, setAppState] = useState({
    items: [],
    loading: true// esto se agrega para validar si esta cargando info o no
  });

  const [estado, setAppStateSync] = useState({
    sincronizar: false
  })

  async function refreshPage() {
    await setAppState({ loading: true });
    await setAppStateSync({ sincronizar: true }); //aca cambia el estado y ejecuta el useEffect de nuevo
    //llamarApi();
  }

  async function llamarApi() {
    setAppState({ loading: true });
    
    fetch(apiUrl, {
      method: 'get',
      headers: new Headers({
        'X-Shopify-Access-Token': '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',
      }),
    })
      .then((response) => response.json())
      .then((data) => setAppState({
        items: data,
        loading: false// se setea false cuando carga info del api bien
      }),);
  }

  useEffect(() => {
    llamarApi();
  }, [estado]);

  return (
    <div className="App">
      <Container>
        <Row>
          <Col className='titulo1' md={3}>
            <h1>Artículos</h1>
          </Col>
          <Col md={3}>
          </Col>
          <Col md={3}>
          </Col>
          <Col className='divSync' md={3}>
            <Button onClick={refreshPage} color="secondary btnSync ">
              <i class="fa fa-refresh iconSync"></i>
              Sincronizar</Button>{' '}
          </Col>
        </Row>
        <br></br>
      </Container>
      <div className="App">
        {
          !appState.loading &&//aca se hace validacion con JavaScript
          appState.items.products.map((item) => (
            <Container key={item.id}>
              <Row className='Rowpersonaizado' >
                <Col className="imagen" md={4}>

                  <img
                    src={item.image.src}
                    width="100%"
                    height="100%"
                  />
                </Col>
                <Col className="center" md={3}>
                  <Container>
                    <Row >
                      <Col>
                        <Label>{item.title}</Label>
                      </Col>

                    </Row>
                    <Row >
                      <Col>
                        <Button className='btnVendor '  >
                          {item.vendor}</Button>{' '}
                      </Col>

                    </Row>
                  </Container>
                </Col>
                <Col md={3}>

                </Col>
                <Col className="centerUnidades" md={2}>
                  <Container>
                    <Row>
                      <Col md={12}>
                        <Label>{item.variants[0].inventory_quantity}</Label>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={12}>
                        <Label>Unidades</Label>
                      </Col>
                    </Row>
                  </Container>


                </Col>
              </Row>
              <br></br>
            </Container>
          ))
        }

      </div>


    </div>
  );
}

export default App;
