import React, {FC} from 'react';
// style
import "./amountCounterButton.scss";

interface IAmountCounterButton {
    amount: number,
    onReduce: () => void,
    onAdd: () => void,
    maxAmount: null | number,
    minAmount: null | number
}
const AmountCounterButton: FC<IAmountCounterButton> = ({amount, onReduce, onAdd, maxAmount = null, minAmount = 1}) => {

    return (
        <div className="amount-counter-button">
            <button className="amount-counter-button__reduce" onClick={onReduce} disabled={amount === minAmount}>
                <svg width="2rem" height="2rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                        d="M6 12H 12"
                        stroke={amount === minAmount ? "gray" : "black"}
                    />
                </svg>
            </button>
            <input className="amount-counter-button__amount" type="number" value={amount} readOnly/>
            <button className="amount-counter-button__add" onClick={onAdd} disabled={amount === maxAmount}>
                <svg width="2rem" height="2rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M12 7V17M7 12H17"
                        stroke={amount === maxAmount ? "gray" : "black"}
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
            </button>
        </div>
    );
};

export default AmountCounterButton;