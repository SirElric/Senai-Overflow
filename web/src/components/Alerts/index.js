import React from 'react';

// import { Container } from './styles';

function Alerts(props) {

    const {mensagem} = props;

    return (
        <Alerts>
            <h1>
                {mensagem}
            </h1>
        </Alerts>
    );
}

export default Alerts;