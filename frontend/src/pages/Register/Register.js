import React, { useContext, useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Select from "react-select";
import "./register.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spiner from "../../components/Spiner/Spiner";
import { registerfunc } from "../../services/Apis";
import { useNavigate } from "react-router-dom";
import { addData } from "../../components/context/ContextProvider";
const Register = () => {
  //get the value
  const [inputdata, setInputData] = useState({
    fname: "",
    lname: "",
    email: "",
    mobile: "",
    gender: "",
    location: "",
  });
  // console.log(inputdata);

  //state for status and img
  const [status, setStatus] = useState("Active");

  const [image, setImage] = useState("");

  //handle change preview Image
  const [preview, setPreview] = useState("");
  // Loading
  const [showspin, setShowSpin] = useState(true);

  const navigate = useNavigate();

  const { useradd, setUseradd } = useContext(addData);
  //Status Opitons
  const options = [
    { value: "Active", label: "Active" },
    { value: "InActive", label: "InActive" },
  ];

  // function for input value
  const setInputValue = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputdata, [name]: value });
  };

  // set new status function
  const setStatusValue = (e) => {
    setStatus(e.value);
  };

  //profile Image handle function

  const setProfile = (e) => {
    setImage(e.target.files[0]);
  };

  // Submit User Data Handle Here
  const submitUserData = async (e) => {
    e.preventDefault();

    //destructuring all Form Data
    const { fname, lname, email, mobile, gender, location } = inputdata;
    if (fname === "") {
      toast.error("First Name is Required");
    } else if (lname === "") {
      toast.error("Last Name is Required");
    } else if (email === "") {
      toast.error("Email is Required");
    } else if (!email.includes("@")) {
      toast.error("Enter Valid Email !");
    } else if (mobile === "") {
      toast.error("Mobile No is Required");
    } else if (mobile.length > 10) {
      toast.error("Enter Valid Mobile !");
    } else if (gender === "") {
      toast.error("Gender is Required !");
    } else if (status === "") {
      toast.error("Status is Required !");
    } else if (image === "") {
      toast.error("Profile is Required !");
    } else if (location === "") {
      toast.error("Location is Required");
    } else {
      const data = new FormData();
      data.append("fname", fname);
      data.append("lname", lname);
      data.append("email", email);
      data.append("mobile", mobile);
      data.append("gender", gender);
      data.append("status", status);
      data.append("user_profile", image);
      data.append("location", location);

      const config = {
        "Content-Type": "multipart/form-data",
        // to post from data to server
      };

      const response = await registerfunc(data, config);
      // console.log(response);

      if (response.status === 200) {
        setInputData({
          ...inputdata,
          fname: "",
          lname: "",
          email: "",
          mobile: "",
          gender: "",
          location: "",
        });
        setStatus("");
        setImage("");
        setUseradd(response.data);
        navigate("/");
      } else {
        toast.error("Something Went Wrong");
      }
    }
  };

  // function for change preview Image
  useEffect(() => {
    if (image) {
      setPreview(URL.createObjectURL(image));
    }
    setTimeout(() => {
      setShowSpin(false);
    }, 1000);
  }, [image]);

  return (
    <>
      {showspin ? (
        <Spiner />
      ) : (
        <div className="container">
          <h2 className="text-center mt-1">Register Your Details</h2>
          <Card className="shadow mt-3 p-3">
            <div className="profile_div text-center">
              <img src={preview ? preview : "/man.png"} alt="" />
            </div>

            <Form>
              <Row>
                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="formBasicEmail"
                >
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="fname"
                    value={inputdata.fname}
                    placeholder="Enter First Name"
                    onChange={setInputValue}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="formBasicEmail"
                >
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="lname"
                    value={inputdata.lname}
                    placeholder="Enter Last Name"
                    onChange={setInputValue}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="formBasicEmail"
                >
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={inputdata.email}
                    placeholder="Enter Email"
                    onChange={setInputValue}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="formBasicEmail"
                >
                  <Form.Label>Mobile</Form.Label>
                  <Form.Control
                    type="text"
                    name="mobile"
                    value={inputdata.mobile}
                    placeholder="Enter Mobile"
                    onChange={setInputValue}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="formBasicEmail"
                >
                  <Form.Label>Select Your Gender</Form.Label>
                  <Form.Check
                    type={"Radio"}
                    label={"Male"}
                    name={"gender"}
                    value={"Male"}
                    onChange={setInputValue}
                  />
                  <Form.Check
                    type={"Radio"}
                    label={"Female"}
                    name={"gender"}
                    value={"Female"}
                    onChange={setInputValue}
                  />
                </Form.Group>

                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="formBasicEmail"
                >
                  <Form.Label>Select Status</Form.Label>
                  <Select
                    options={options}
                    // value={status}
                    onChange={setStatusValue}
                  />
                </Form.Group>

                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="formBasicEmail"
                >
                  <Form.Label>Select Your Profile</Form.Label>
                  <Form.Control
                    type="file"
                    name="user_profile"
                    placeholder="Select Your Profile"
                    onChange={setProfile}
                  />
                </Form.Group>

                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="formBasicEmail"
                >
                  <Form.Label>Enter Your Location</Form.Label>
                  <Form.Control
                    type="text"
                    name="location"
                    value={inputdata.location}
                    placeholder="Enter Your Location"
                    onChange={setInputValue}
                  />
                </Form.Group>
              </Row>

              <Button variant="primary" type="submit" onClick={submitUserData}>
                Submit
              </Button>
            </Form>
          </Card>
          <ToastContainer position="top-center" />
        </div>
      )}
    </>
  );
};

export default Register;
