import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateContact = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const navigate = useNavigate();
    const { name: contactName } = useParams(); // Mengambil nama dari parameter URL

    useEffect(() => {
        // Pastikan contactName sudah ada sebelum memanggil getContactByName
        if (contactName) {
            getContactByName(contactName);
        }
    }, [contactName]); // Dependency array memastikan getContactByName dipanggil setiap contactName berubah

    const updateContact = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8080/api/contacts/${contactName}`, {
                name,
                email,
                phone,
            });
            navigate("/"); // Arahkan ke halaman utama setelah update
        } catch (error) {
            console.log('Error updating contact:', error);
        }
    };

    const getContactByName = async (name) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/contacts/${name}`);
            const contactArray = response.data.data;
            if(contactArray.length> 0){
            const contact = contactArray[0];
            setName(contact.name);
            setEmail(contact.email);
            setPhone(contact.phone);
            }
        } catch (error) {
            console.log('Error fetching contact:', error);
        }
    };
   /*  const getContactByName = async (name) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/contacts/${name}`);
            const contact = response.data.data; // Mengasumsikan 'data' adalah object
            setName(contact.name);
            setEmail(contact.email);
            setPhone(contact.phone);
        } catch (error) {
            console.log('Error fetching contact:', error);
        }
    }; */
    

    return (
        <div className="columns mt-5 is-centered">
            <div className="column is-half">
                <form onSubmit={updateContact}>
                    <div className="field">
                        <label className="label">Name</label>
                        <div className="control">
                            <input 
                                type="text" 
                                className="input"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder='Name'
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Email</label>
                        <div className="control">
                            <input 
                                type="text" 
                                className="input"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder='Email'
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Phone</label>
                        <div className="control">
                            <input 
                                type="text" 
                                className="input"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder='Phone'
                            />
                        </div>
                    </div>
                    <div className="field">
                        <button 
                            type="submit" 
                            className="button is-success"
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UpdateContact;
