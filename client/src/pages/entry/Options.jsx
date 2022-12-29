import * as React from "react";
import axios from "axios";
import ScoopOption from "./ScoopOption";
import ToppingOption from "./ToppingOption";
import Row from "react-bootstrap/Row";
import AlertBanner from "../common/AlertBanner";
import { pricePerItem } from "../../constants";
import { formatCurrency } from "../../utilities";
import { useOrderDetails } from "../../contexts/OrderDetails";

export default function Options({ optionsType }) {
  const [items, setItems] = React.useState([]);
  const [error, setError] = React.useState(false);
  const { totals } = useOrderDetails();

  React.useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionsType}`)
      .then((response) => setItems(response.data))
      .catch((error) => setError(true));
  }, [optionsType]);

  if (error) {
    return <AlertBanner />;
  }

  const ItemComponent = optionsType === "scoops" ? ScoopOption : ToppingOption;
  const title =
    optionsType[0].toUpperCase() + optionsType.slice(1).toLowerCase();

  const optionItems = items.map((item) => (
    <ItemComponent
      key={item.name}
      imagePath={item.imagePath}
      name={item.name}
    />
  ));

  return (
    <>
      <h2>{title}</h2>
      <p>{formatCurrency(pricePerItem[optionsType])} each</p>
      <p>
        {title} total: {formatCurrency(totals[optionsType])}
      </p>
      <Row>{optionItems}</Row>
    </>
  );
}
