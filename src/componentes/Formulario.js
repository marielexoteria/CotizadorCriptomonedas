import React, { Component } from 'react';
import axios from 'axios';

import Criptomoneda from './Criptomoneda';
import Error from './Error';

class Formulario extends Component {
    state = { 
        criptomonedas: [],
        moneda: '',
        criptomoneda: '',
        error: false
    }

    //haciendo el llamado a la API
    //componentWillMount() hará el llamado antes de que el componente cargue, así mejorando el rendimiento y funcionamiento de la aplicación
    async componentWillMount() {
        const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD&api_key={9fcacd9eef04d3a4284248794b3e629ab09854201972945186c5b32150b1505c}';

        await axios.get(url)
              .then (respuesta => {
                  this.setState({
                      criptomonedas: respuesta.data.Data
                  })
              })
    }

    //se ejecuta cada vez que el usuario elija una opción del select
    //lee el valor de lo que el usuario eligió en cada select y actualiza en el state
    obtenerValor = e => {
        const {name, value} = e.target;
        this.setState({
            [name] : value
        })
    }

    //validar que el usuario elija las monedas
    cotizarMoneda = e => {
        e.preventDefault();
        const {moneda, criptomoneda} = this.state;

        //validar que haya algo en el state (que el usuario haya elegido las 2 monedas)
        if (moneda === '' || criptomoneda === '') {
            this.setState({
                error: true
            }, () => {
                setTimeout(() => {
                    this.setState({
                        error: false
                    })
                }, 3000);
            })
            return;
        }

        //crear el objeto
        const cotizacion = { 
            moneda, //al el objeto y la propiedad llamarse igual, moneda = moneda: moneda
            criptomoneda
        }


        //enviar los datos al componente padre App.js para hacer la cotización
        this.props.cotizarCriptomoneda(cotizacion);
    }

    render() { 
        const mensajeError = (this.state.error) ? <Error mensajeError = "Ambos campos son obligatorios" /> : "";
        return (  
            <form onSubmit={this.cotizarMoneda}>
                {mensajeError}
                <div className="row">
                    <label>Elige tu Moneda</label>
                    <select onChange={this.obtenerValor} name="moneda" className="u-full-width">
                            <option value="">Elige tu moneda</option>
                            <option value="USD">Dolar Estadounidense</option>
                            <option value="MXN">Peso Mexicano</option>
                            <option value="GBP">Libras</option>
                            <option value="EUR">Euros</option>
                    </select>
                </div>

                <div className="row">
                <div>
                    <label>Elige tu Criptomoneda</label>
                    <select onChange={this.obtenerValor} name="criptomoneda" className="u-full-width">
                        <option value="">Elige tu criptomoneda</option>
                        {Object.keys(this.state.criptomonedas).map(key => ( //arrow function con return implícito = (<Criptomoneda...)
                            <Criptomoneda
                                key={key}
                                criptomoneda={this.state.criptomonedas[key]} 
                            />
                        ))}
                    </select>
                </div>
                </div>
                <input className="button-primary u-full-width" type="submit" value="Cotizar" />
            </form>
        );
    }
}
 
export default Formulario;