import database from '../firebase/firebase';

export const isLongerThanThreeDays = (n) => {
    // get timestamp for now
    const now = Date.now();
    // get timestamp for 3 days ago
    // 259200000 milliseconds in 3 days
    const threeDaysAgo = now - 259200000;
    // has user updated mood in the previous 3 days?
    // retrieve entry before the current one
    const user = n;
    const uid = user.uid;
    // return two most recent entries
    database.ref(`users/${uid}/entries`)
    .orderByChild('createdAt')
    .limitToLast(2)
    .on('value', (snapshot) => {
        snapshot.forEach((child) => {
            // if timestamp for either entry is older than 3 days
            let time = child.val().createdAt;
            console.log(time);
            if(time < threeDaysAgo) {
                return (
                    this.setState({ toggleHowLong: true })
                );
            }
        })
    })   
}