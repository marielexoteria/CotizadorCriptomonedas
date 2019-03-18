import React from 'react';

const Criptomoneda = ({criptomoneda}) => { //haciendo destructuring del objeto y extrayendo lo que se quiere desplegar
    const {FullName, Name} = criptomoneda.CoinInfo;

    return ( 
        <option value={Name}>{FullName}</option>
    );
}
 
export default Criptomoneda;