import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./FormField.css";
import { MDBRow, MDBCol, MDBInput, MDBBtn } from "mdb-react-ui-kit";
import Swal from "sweetalert2";

const EditForm = () => {
  const id = useParams().id;
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({});

  useEffect(() => {
    const fetchHandler = async () => {
      await axios
        .get(`http://localhost:8080/stocks/${id}`)
        .then((res) => res.data)
        .then((data) => setInputs(data.stock));
    };
    fetchHandler();
  }, [id]);

  const sendRequest = async () => {
    await axios
      .put(`http://localhost:8080/stocks/${id}`, {
        name: inputs.name,
        price: inputs.price,
        date: inputs.date,
        description: inputs.description,
      })
      .then((res) => res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputs.price || !inputs.name || !inputs.date) {
      return Swal.fire({
        icon: "error",
        title: "Error!",
        text: "All fields are required.",
        showConfirmButton: true,
      });
    }
    await sendRequest();
    Swal.fire({
      icon: "success",
      title: "Updated!",
      text: `${inputs.name} 's data has been Updated.`,
      showConfirmButton: false,
      timer: 1500,
    });
    navigate("/");
  };

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div>
      <div className="small-container">
        <h1>Enter the details below: </h1>
        <form onSubmit={handleSubmit}>
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
            Update
          </MDBBtn>
        </form>
      </div>
    </div>
  );

};

export default EditForm;
