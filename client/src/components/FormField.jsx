import React, { useState } from "react";
import "./FormField.css";
import {
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
} from "mdb-react-ui-kit";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FormField = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    name: "",
    price: 0,
    description: "",
    data: "",
  });
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const submitRequest = async () => {
    await axios
      .post("http://localhost:8080/add", {
        name: inputs.name,
        price: inputs.price,
        date: inputs.date,
        description: inputs.description,
      })
      .then((res) => res.data);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!inputs.price || !inputs.name || !inputs.date) {
      return Swal.fire({
        icon: "error",
        title: "Error!",
        text: "All fields are required.",
        showConfirmButton: true,
      });
    }
    submitRequest().then();

    Swal.fire({
      icon: "success",
      title: "Added!",
      text: `${inputs.name} 's data has been Added.`,
      showConfirmButton: false,
      timer: 1500,
    });
    navigate("/");
  };

  return (
    <div>
      <div className="small-container">
        <h1>Enter the details below: </h1>
        <form onSubmit={handleAdd}>
          <MDBRow className="mb-4">
            <MDBCol>
              <MDBInput id="name"   label="Name"              
                name="name"
                value={inputs.name}
                onChange={handleChange}
                required/>
            </MDBCol>
          </MDBRow>

          <MDBInput
            wrapperClass="mb-4"
            label="Price"
            id="price"
            type="Number"
            name="price"
            value={inputs.price}
            onChange={handleChange}
            required
          />
          <MDBInput
            wrapperClass="mb-4"
            id="date"
            type="text"
            name="date"
            value={inputs.date}
            onChange={handleChange}
            required
            label="Date"
          />

          <MDBInput
            wrapperClass="mb-4"
            textarea
            id="description"
            type="text"
            name="description"
            value={inputs.description}
            onChange={handleChange}
            rows={4}
            label="Description"
          />

          <MDBBtn className="mb-4" type="submit" block color="black">
            Add
          </MDBBtn>
        </form>

        {/* <form onSubmit={handleAdd}>
          <h1>Add Employee</h1>
          <label htmlFor="firstName">Name*</label>
          <input
            id="name"
            type="text"
            name="name"
            value={inputs.name}
            onChange={handleChange}
            required
          />
          <label htmlFor="price">Price* </label>
          <input
            id="price"
            type="Number"
            name="price"
            value={inputs.price}
            onChange={handleChange}
            required
          />
          <label htmlFor="date">Date*</label>
          <input
            id="date"
            type="text"
            name="date"
            value={inputs.date}
            onChange={handleChange}
            required
          />
          <label htmlFor="description">Description</label>
          <input
            id="description"
            type="text"
            name="description"
            value={inputs.description}
            onChange={handleChange}
          />

          <button type="submit">Add</button>
        </form> */}
      </div>
    </div>
  );
};

export default FormField;
