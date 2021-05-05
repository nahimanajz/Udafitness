export const ADD_ENTRY = "ADD_ENTRY"
export const RECEIVE_ENTRIES= "RECEIVE_ENTRIES"

export const addEntry =(entry)=> ({
    type: ADD_ENTRY,
    entry
});
export const receiveEntries =(entries)=> ({
    type: RECEIVE_ENTRIES,
    entries
});