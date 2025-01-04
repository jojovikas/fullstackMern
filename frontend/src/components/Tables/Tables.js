import React, { Profiler } from "react";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";
import Badge from "react-bootstrap/Badge";
import { NavLink } from "react-router-dom";

import "./table.css";
import { BASE_URL } from "../../services/helper";
import { statuschangefunc } from "../../services/Apis";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Tables = ({ userdata, deleteUser, userGet }) => {
  // handle status function
  const handleChange = async (id, status) => {
    const response = await statuschangefunc(id, status);
    if (response.status === 200) {
      userGet();
      toast.success("Status Update");
    } else {
      toast.success("error");
    }
  };

  return (
    <>
      <div className="container">
        <Row>
          <div className="col mt-2">
            <Card className="shadow">
              <Table className="align-item-center" responsive="sm">
                <thead className="thead-dark">
                  <tr className="table-dark">
                    <th>ID</th>
                    <th>FullName</th>
                    <th>Email</th>
                    <th>Gender</th>
                    <th>Status</th>
                    <th>Profile</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {userdata.length > 0 ? (
                    userdata.map((element, index) => {
                      return (
                        <>
                          <tr>
                            <td>{index + 1}</td>
                            <td>{element.fname + " " + element.lname}</td>
                            <td>{element.email}</td>
                            <td>{element.gender}</td>
                            <td className="d-flex align-items-center">
                              <Dropdown className="text-center">
                                <Dropdown.Toggle
                                  className="dropdown_btn"
                                  id="dropdown-basic"
                                >
                                  <Badge
                                    bg={
                                      element.status == "Active"
                                        ? "primary"
                                        : "danger"
                                    }
                                  >
                                    {element.status}
                                    <i class="fa-solid fa-angle-down"></i>
                                  </Badge>
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                  <Dropdown.Item
                                    onClick={() =>
                                      handleChange(element._id, "Active")
                                    }
                                  >
                                    Active
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    onClick={() =>
                                      handleChange(element._id, "InActive")
                                    }
                                  >
                                    InActive
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </td>
                            <td className="img_parent">
                              <img
                                src={`${BASE_URL}/uploads/${element.profile}`}
                                alt="image"
                              />
                            </td>
                            <td>
                              <Dropdown className="text-center">
                                <Dropdown.Toggle
                                  className="dropdown_btn"
                                  id="dropdown-basic"
                                >
                                  <i class="fa-solid fa-ellipsis-vertical action"></i>
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                  <Dropdown.Item>
                                    <NavLink
                                      to={`/userprofile/${element._id}`}
                                      className="text-decoration-none"
                                    >
                                      <i class="fa-solid fa-eye"></i> View
                                    </NavLink>
                                  </Dropdown.Item>

                                  <Dropdown.Item>
                                    <NavLink
                                      to={`/edit/${element._id}`}
                                      className="text-decoration-none"
                                    >
                                      <i class="fa-solid fa-pen-to-square"></i>{" "}
                                      Edit
                                    </NavLink>
                                  </Dropdown.Item>

                                  <Dropdown.Item>
                                    <div
                                      onClick={() => deleteUser(element._id)}
                                    >
                                      <i class="fa-solid fa-trash"></i> Delete
                                    </div>
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </td>
                          </tr>
                        </>
                      );
                    })
                  ) : (
                    <div className="no_data text-center">NO DATA FOUND</div>
                  )}
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
        <ToastContainer />
      </div>
    </>
  );
};

export default Tables;
