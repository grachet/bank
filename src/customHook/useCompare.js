import usePrevious from "./usePrevious"

export default const useCompare = (val) => {
    const prevVal = usePrevious(val)
    return prevVal !== val
}

//const Component = (props) => {
    // ...
    // const hasVal1Changed = useCompare(val1)