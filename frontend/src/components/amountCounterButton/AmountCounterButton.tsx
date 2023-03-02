import React, {CSSProperties, FC} from 'react';
import {SxProps} from "@mui/material";
// style
import "./amountCounterButton.scss";

interface IAmountCounterButton {
    amount: number,
    onReduce: () => void,
    onAdd: () => void,
    maxAmount: null | number,
    minAmount: null | number,
    style?: CSSProperties
}
const AmountCounterButton: FC<IAmountCounterButton> = ({amount, onReduce, onAdd, maxAmount = null, minAmount = 1, style}) => {

    return (
        <div style={style} className="amount-counter-button">
            <button className="amount-counter-button__reduce" onClick={onReduce} disabled={amount === minAmount}>
                <svg width="2rem" height="2rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M6 12H 12"
                        stroke={amount === minAmount ? "gray" : "black"}
                    />
                </svg>
            </button>
            <input style={{}} className="amount-counter-button__amount" type="number" value={amount} readOnly/>
            <button className="amount-counter-button__add" onClick={onAdd} disabled={amount === maxAmount}>
                <svg width="2rem" height="2rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M12 7V17M7 12H17"
                        stroke={amount === maxAmount ? "gray" : "black"}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </button>
        </div>
    );
};

export default AmountCounterButton;