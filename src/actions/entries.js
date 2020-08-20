import uuid from 'uuid';
import database from '../firebase/firebase';

// ADD_ENTRY
export const addEntry = (entry) => ({
  type: 'ADD_ENTRY',
  entry
});

export const startAddEntry = (entryData = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const {
      weatherSymbol = '',
      note = '',
      createdAt = 0,
      words = []
    } = entryData;
    const entry = { weatherSymbol, note, createdAt, words };

    return database.ref(`users/${uid}/entries`).push(entry).then((ref) => {
      dispatch(addEntry({
        id: ref.key,
        ...entry
      }));
    });
  };
};

// REMOVE_ENTRY
export const removeEntry = ({ id } = {}) => ({
  type: 'REMOVE_ENTRY',
  id
});

export const startRemoveEntry = ({ id } = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/entries/${id}`).remove().then(() => {
      dispatch(removeEntry({ id }));
    });
  };
};

// EDIT_ENTRY
export const editEntry = (id, updates) => ({
  type: 'EDIT_ENTRY',
  id,
  updates
});

export const startEditEntry = (id, updates) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/entries/${id}`).update(updates).then(() => {
      dispatch(editEntry(id, updates));
    });
  };
};

// SET_ENTRIES
export const setEntries = (entries) => ({
  type: 'SET_ENTRIES',
  entries
});

export const startSetEntries = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/entries`).once('value').then((snapshot) => {
      const entries = [];

      snapshot.forEach((childSnapshot) => {
        entries.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        });
      });

      dispatch(setEntries(entries));
    });
  };
};
