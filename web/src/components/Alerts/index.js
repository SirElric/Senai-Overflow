import React, {useEffect} from 'react';

import { Alert } from "./styles.js";

function Alerts(props) {

    const {mensagem, tipo, setMensagem} = props;

    useEffect(() => {

    })

    return mensagem ? (
        <Alert tipo={tipo}>
            <h1>{mensagem}</h1>
            <span onClick={() => {
                setMensagem(undefined);
            }}>&times;</span>
        </Alert>
    ) : null;
}

export default Alerts;