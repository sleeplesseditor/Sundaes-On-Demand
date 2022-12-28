import * as React from 'react';
import axios from 'axios';
import ScoopOption from './ScoopOption';
import ToppingOption from './ToppingOption';
import Row from 'react-bootstrap/Row';
import AlertBanner from '../common/AlertBanner';
import { pricePerItem } from '../../constants';
import { formatCurrency } from '../../utilities';

export default function Options({optionType}){
    const [items, setItems] = React.useState([]);
    const [error, setError] = React.useState(false);

    React.useEffect(() => {
        axios.get(`http://localhost:3030/${optionType}`)
            .then(response => setItems(response.data))
            .catch(error => setError(true))
    }, [optionType]);

    if(error) {
        <AlertBanner />
    }

    const ItemComponent = optionType === 'scoops' ? ScoopOption : ToppingOption;
    const title = optionType[0].toUpperCase() + optonType.slice(1).toLowerCase();

    const optionItems = items.map(item => (
        <ItemComponent
            key={item.name}
            imagePath={item.imagePath}
            name={item.name}
        />
    ))

    return (
        <>
            <h2>{title}</h2>
            <p>{formatCurrency(pricePerItem[optionType])} each</p>
            <Row>{optionItems}</Row>
        </>
    );
}