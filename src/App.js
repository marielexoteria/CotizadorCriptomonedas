import React, { Component } from 'react';
import axios from 'axios';

//importando la gráfica que se despliega en el lado izquierdo del browser
import imagen from './cryptomonedas.png';

//importando los componentes
import Formulario from './componentes/Formulario';
import Resultado from './componentes/Resultado';
import Spinner from './componentes/Spinner';

class App extends Component {
  state = {
      resultado: {},
      monedaSeleccionada: '',
      criptoSeleccionada: '',
      cargandoSpinner: false
  }

  cotizarCriptomoneda = async (cotizacion) => {
      //obtener los valores
      const {moneda, criptomoneda} = cotizacion;

      //realizando la consulta con axios a la API
      const apiKey = "{9fcacd9eef04d3a4284248794b3e629ab09854201972945186c5b32150b1505c}";
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}&api_key=${apiKey}`;
      await axios.get(url)
            .then (respuesta => {
                this.setState({
                    resultado: respuesta.data.DISPLAY[criptomoneda][moneda],
                    cargandoSpinner: true
                }, () => { //callback para que solamente muestre el spinner de carga por 3 segundos
                    setTimeout(() => {
                        this.setState({
                            cargandoSpinner: false
                        })
                    }, 3000)
                })
            })
  }

  render() {
      //mostrando el spinner de carga por 3 segundos solamente cuando el usuario haga click en el botón Cotizar y a continuación mostrando los resultados
      const resultado = (this.state.cargandoSpinner) ? <Spinner /> : <Resultado resultado = {this.state.resultado} />;

      return (
          <div className="container">
              <div className="row">
                  <div className="one-half column">
                      <img src={imagen} al="imagen" />
                  </div>
                  <div className="one-half column">
                      <h1>Cotiza Criptomonedas al Instante</h1>
                      <Formulario 
                          cotizarCriptomoneda = {this.cotizarCriptomoneda}
                      />
                      {resultado}
                  </div>
              </div>
          </div>
        );
    }
}

export default App;
