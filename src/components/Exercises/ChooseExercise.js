export const ChooseExercise = (selectionForRoute) => {
    // select a random exercise from the selection for the given route
    const randomItem = selectionForRoute[Math.floor(Math.random() * selectionForRoute.length)];
    //console.log(randomItem);
    return randomItem;
}