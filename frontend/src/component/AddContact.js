import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddContact = () => {

    const[name, setName] = useState("");
    const[email, setEmail] = useState("");
    const[phone, setPhone] = useState("");
    const navigate = useNavigate();

    const saveContact = async (e) => {
        e.preventDefault();
        try {
          await axios.post("http://localhost:8080/api/contacts", {
            name,
            email,
            phone,
          });
          navigate("/");
        } catch (error) {
          console.log(error);
        }
      };

  return (
    <div className="columns mt-5 is-centered">
        <div className="column is-half">
            <form onSubmit={saveContact}>
                <div className = "field">
                    <label className="label">
                        Name
                    </label>
                    <div className="control">
                        <input type="text" className="input"
                        value={name}
                        onChange={(e)=> setName(e.target.value)}
                        placeholder='Name'/>
                    </div>
                </div>
                <div className = "field">
                    <label className="label">
                        Email
                    </label>
                    <div className="control">
                        <input type="text" className="input"
                        value={email}
                        onChange={(e)=> setEmail(e.target.value)}
                        placeholder='Email'/>
                    </div>
                </div>
                <div className = "field">
                    <label className="label">
                        Phone
                    </label>
                    <div className="control">
                        <input type="text" className="input"
                        value={phone}
                        onChange={(e)=> setPhone(e.target.value)}
                        placeholder='Phone'/>
                    </div>
                </div>
                <div className="field">
                    <button type="submit" className="button is-success">
                    Add
                    </button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default AddContact
