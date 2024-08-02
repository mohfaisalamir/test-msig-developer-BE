import {BrowserRouter, Routes, Route} from "react-router-dom";
import ContactList from "./component/ContactList";
import AddContact from "./component/AddContact";
import UpdateContact from "./component/UpdateContact";
function App() {
  return (
    <BrowserRouter> 
      <Routes>
        <Route path="/" element={<ContactList/>}/>
        <Route path="/add" element={<AddContact/>}/>
        <Route path="/update/:name" element={<UpdateContact/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
