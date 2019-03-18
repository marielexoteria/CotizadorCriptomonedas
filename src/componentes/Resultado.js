import React from 'react';

const Resultado = ({resultado}) => {
    if (Object.entries(resultado).length === 0) return null; //si el objeto no tiene datos, que no muestre lo que está en el div de abajo. Esto para que se muestre cuando el usuario seleccione la moneda y la criptomoneda.
    return (  
        <div className="resultado">
            <h2>Resultado</h2>
            <p className="precio">El precio es: <span>{resultado.PRICE}</span></p>
            <p>El precio más alto del día es: <span>{resultado.HIGHDAY}</span></p>
            <p>El precio más bajo del día es: <span>{resultado.LOWDAY}</span></p>
            <p>Variación en las últimas 24 horas: <span>{resultado.CHANGEPCT24HOUR}%</span></p>
            <p>Última actualización: <span>{resultado.LASTUPDATE}</span></p>
        </div>
    );
}
 
export default Resultado;