import Options from '../entry/Options';

export default function OrderEntry() {
    return (
        <div>
            <Options optionsType="scoops" />
            <Options optionsType="toppings" />
        </div>
    );
}