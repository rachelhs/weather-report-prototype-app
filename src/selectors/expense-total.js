const getExpenseTotal = (expenses) => {
    if (expenses.length === 0) {
        return 0;
    }
    else {
    const amounts = expenses.map((x) => x.amount);
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const total = amounts.reduce(reducer, 0);
    return total;
    }
};

export default getExpenseTotal;