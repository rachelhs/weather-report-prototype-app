const getEntryTotal = (entries) => {
    if (entries.length === 0) {
        return 0;
    }
    else {
    const amounts = entries.map((x) => x.amount);
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const total = amounts.reduce(reducer, 0);
    return total;
    }
};

export default getEntryTotal;