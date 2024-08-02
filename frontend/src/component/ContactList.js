import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

const ContactList = () => {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        getContacts();
    }, []);

    const getContacts = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/contacts');
            console.log('API Response:', response); // Periksa format data
            // Mengakses array kontak dari response.data.data
            setContacts(response.data.data); 
        } catch (error) {
            console.error('Error fetching contacts:', error);
        }
    }
    const deleteContact = async (name) => {
        try {
            // Menggunakan nama dalam URL untuk permintaan DELETE
            await axios.delete(`http://localhost:8080/api/contacts/${name}`);
            getContacts(); // Memuat ulang daftar kontak setelah penghapusan
        } catch (error) {
            console.log('Error deleting contact:', error);
        }
    };
    

    return (
        <div className="columns mt-5 is-centered">
            <div className="column is-half">
            <Link to={`add`} className="button is-success">
                Add New Contact
             </Link>
                <table className="table is-striped is-fullwidth">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <td>Action</td>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(contacts) ? (
                            contacts.length > 0 ? (
                                contacts.map((contact, index) => (
                                    <tr key={contact.id}>
                                        <td>{index + 1}</td>
                                        <td>{contact.name}</td>
                                        <td>{contact.email}</td>
                                        <td>{contact.phone}</td>
                                        <td>
                                        <Link to={`/update/${contact.name}`}
                                            className="button is-small is-info mr-2">
                                        Update
                                        </Link>
                                        <button
                                            onClick={() => deleteContact(contact.name)}
                                            className="button is-small is-danger">
                                            Delete
                                        </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5">No contacts found</td>
                                </tr>
                            )
                        ) : (
                            <tr>
                                <td colSpan="5">Error: Contacts is not an array</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ContactList;