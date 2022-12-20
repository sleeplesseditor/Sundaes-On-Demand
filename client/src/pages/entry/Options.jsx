import * as React from 'react';
import axios from 'axios';
import ScoopOption from './ScoopOption';
import Row from 'react-bootstrap/Row';

export default function Options({optionType}){
    const [items, setItems] = React.useState([])

    React.useEffect(() => {
        axios.get(`http://localhost:3030/${optionType}`)
            .then(response => setItems(response.data))
            .catch(error => console.error('ERR', error))
    }, [optionType]);

    const ItemComponent = optionType === 'scoops' ? ScoopOption : null;

    const optionItems = items.map(item => (
        <ItemComponent
            key={item.name}
            imagePath={item.imagePath}
            name={item.name}
        />
    ))

    return <Row>{optionItems}</Row>;
}