import './App.css';
import {Routes, Route} from "react-router-dom";
import FormField from './components/FormField';
import Home from './components/Home';
import Navbar from './components/Navbar';
import EditForm from './components/EditForm';
function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/add' element={<FormField/>}/>
      <Route path='/stocks/:id' element={<EditForm/>}/>
    </Routes>

    </div>
  );
}

export default App;
