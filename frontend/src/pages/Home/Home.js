import React, { useContext, useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import Alert from "react-bootstrap/Alert";
import "./home.css";
import { useNavigate } from "react-router-dom";
import Tables from "../../components/Tables/Tables";
import Spiner from "../../components/Spiner/Spiner";
import {
  addData,
  dltdata,
  updateData,
} from "../../components/context/ContextProvider";
import { usegetfunc, deletfunc } from "../../services/Apis";
import { toast } from "react-toastify";

const Home = () => {
  const [userdata, setUserData] = useState([]);
  const [showspin, setShowSpin] = useState(true);
  const [search, setSearch] = useState("");
  const [gender, setGender] = useState("All");
  const [status, setStatus] = useState("All");
  const [sort, setSort] = useState("new");
  const navigate = useNavigate();

  const { useradd, setUseradd } = useContext(addData);
  const { update, setUpdate } = useContext(updateData);
  const { deletedata, setDLtdata } = useContext(dltdata);

  const addUser = () => {
    navigate("/register");
  };

  // Get user
  const userGet = async () => {
    const reasponse = await usegetfunc(search, gender, status, sort);
    if (reasponse.status === 200) {
      setUserData(reasponse.data);
    } else {
      console.log("error from get user Data");
    }
  };

  //user delete
  const deleteUser = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmDelete) {
      return; // Exit if the user cancels the action
    }

    try {
      const response = await deletfunc(id);
      if (response.status === 200) {
        userGet(); // Refresh the data
        setDLtdata(response.data); // Update the context
        toast.success("User deleted successfully!");
      } else {
        toast.error("Error deleting user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Something went wrong!");
    }
  };

  useEffect(() => {
    userGet();
    setTimeout(() => {
      setShowSpin(false);
    }, 1000);
  }, [search, gender, status, sort]);
  return (
    <>
      {useradd ? (
        <Alert variant="success" onClose={() => setUseradd("")} dismissible>
          {useradd.fname.toUpperCase()} Succesfully Added
        </Alert>
      ) : (
        ""
      )}
      {update ? (
        <Alert variant="Primary" onClose={() => setUpdate("")} dismissible>
          {update.fname.toUpperCase()} User Succesfully Update
        </Alert>
      ) : (
        ""
      )}

      {deletedata ? (
        <Alert variant="danger" onClose={() => setDLtdata("")} dismissible>
          {deletedata.fname.toUpperCase()} User Succesfully Delete
        </Alert>
      ) : (
        ""
      )}
      <div className="container">
        <div className="main_div">
          {/* Search and ADD User Btn  */}
          <div className="search_add mt-4 d-flex justify-content-between ">
            <div className="search col-lg-4">
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Button variant="success search_btn">Search</Button>
              </Form>
            </div>
            <div className="add_btn">
              <Button variant="primary " onClick={addUser}>
                {" "}
                <i class="fa-solid fa-plus"></i> Add User
              </Button>
            </div>
          </div>
          {/* export, Gender , Short byvalue, Status  */}
          <div className="filter_div mt-5 d-flex justify-content-between flex-wrap">
            <div className="export_csv">
              <Button className="export_btn"> Export to CSV</Button>
            </div>
            {/* Filter by Gender */}
            <div className="filter_gender">
              <div className="filter">
                <h3>Filter By Gender </h3>
                <div className="gender d-flex justify-content-around">
                  <Form.Check
                    type={"Radio"}
                    label={"All"}
                    name={"gender"}
                    value={"All"}
                    defaultChecked
                    onChange={(e) => setGender(e.target.value)}
                  />
                  <Form.Check
                    type={"Radio"}
                    label={`Male`}
                    name={"gender"}
                    value={"Male"}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  <Form.Check
                    type={"Radio"}
                    label={`Female`}
                    name={"gender"}
                    value={"Female"}
                    onChange={(e) => setGender(e.target.value)}
                  />
                </div>
              </div>
            </div>
            {/* Short by value */}
            <div className="filter_newold">
              <h3>Short By Values</h3>
              <Dropdown className="text-center">
                <Dropdown.Toggle className="dropdown_btn" id="dropdown-basic">
                  <i class="fa-solid fa-sort"></i>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => setSort("new")}>
                    New
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setSort("old")}>
                    Old
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>

            {/* Filter By Status */}
            <div className="filter_status">
              <div className="status">
                <h3>Filter By Status</h3>
                <div className="status_radio d-flex justify-content-around">
                  <Form.Check
                    type={"Radio"}
                    label={`All`}
                    name={"status"}
                    value={"All"}
                    onChange={(e) => setStatus(e.target.value)}
                    defaultChecked
                  />
                  <Form.Check
                    type={"Radio"}
                    label={`Active`}
                    name={"status"}
                    onChange={(e) => setStatus(e.target.value)}
                    value={"Active"}
                  />
                  <Form.Check
                    type={"Radio"}
                    label={`InActive`}
                    name={"status"}
                    value={"InActive"}
                    onChange={(e) => setStatus(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {showspin ? (
          <Spiner />
        ) : (
          <Tables
            userdata={userdata}
            deleteUser={deleteUser}
            userGet={userGet}
          />
        )}
      </div>
    </>
  );
};

export default Home;
