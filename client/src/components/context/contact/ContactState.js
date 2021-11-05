import React, { useReducer } from "react";
// id generator
import uuid from 'uuid';
//context provider
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER
} from '../types';

//Initial State
const ContactState = props => {
    const initialState = {
        contacts: [
            {
                id: 1,
                name: 'John Doe',
                email: 'john@gmail.com',
                phone: '111-111-1111',
                type: 'personal'
            },
            {
                id: 2,
                name: 'Karen Williams',
                email: 'karen@gmail.com',
                phone: '222-222-2222',
                type: 'personal'
            },
            {
                id: 3,
                name: 'Henry Johnson',
                email: 'henry@gmail.com',
                phone: '333-333-3333',
                type: 'professional'
            }
        ]
    };


    //state allows acces to anything in state
    //dispatch objects to reducer to change state
    const [state, dispatch] = useReducer(contactReducer, initialState);

    //Add Contact

    //Delete Contact

    //Set Current Contact

    //Clear Current Contact

    //Update Contact

    //Filter Contacts

    //Clear Filter

    //Return Provider: Wrap entire app with this context
    return (
        // Value: to access state, and actions for other comps
        <ContactContext.Provider
        value={{
            contacts: state.contacts
        }}>
            {/* placeholder for child comps */}
            {props.children}
        </ContactContext.Provider>
    );
};

export default ContactState;