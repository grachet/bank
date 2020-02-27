import { useRef, useEffect } from "react";

export default function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}


//const Component = (props) => {
// const { receiveAmount, sendAmount } = props
// const prevAmount = usePrevious({ receiveAmount, sendAmount });
// useEffect(() => {
//     if (prevAmount.receiveAmount !== receiveAmount) {
//     }
// }, [receiveAmount, sendAmount])
// }