import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import "./profile.css";
import Spiner from "../../components/Spiner/Spiner";
import { useParams } from "react-router-dom";
import { singleUsergetfunc } from "../../services/Apis";
import { BASE_URL } from "../../services/helper";
import moment from "moment";

const Profile = () => {
  const [userprofle, setUserProfile] = useState({});
  const [showspin, setShowSpin] = useState(true);

  const { id } = useParams();
  // console.log(id);

  const userProfileGet = async () => {
    const response = await singleUsergetfunc(id);
    // console.log(response);
    if (response.status === 200) {
      setUserProfile(response.data);
    } else {
      console.log("Error");
    }
  };

  useEffect(() => {
    userProfileGet();
    setTimeout(() => {
      setShowSpin(false);
    }, 1000);
  }, [id]);

  return (
    <>
      {showspin ? (
        <Spiner />
      ) : (
        <div className="container">
          <Card className="card-profile shadow col-lg-8 mx-auto mt-5">
            <Card.Body>
              <Row>
                <div className="col">
                  <div className="card-profile-stats d-flex justify-content-center">
                    <img
                      src={`${BASE_URL}/uploads/${userprofle.profile}`}
                      alt="image"
                    />
                  </div>
                </div>
              </Row>
              <div className="text-center">
                <h3>{userprofle.fname + " " + userprofle.lname}</h3>
                <h4>
                  <i class="fa-solid fa-envelope"> </i>
                  &nbsp; :-<span> {userprofle.email}</span>
                </h4>
                <h5>
                  <i class="fa-solid fa-mobile"></i>
                  &nbsp; :-<span> {userprofle.mobile} </span>
                </h5>

                <h4>
                  <i class="fa-solid fa-person"></i>
                  &nbsp; :-<span> {userprofle.gender}</span>
                </h4>

                <h4>
                  <i class="fa-solid fa-location-dot"></i>
                  &nbsp; :-<span> {userprofle.location}</span>
                </h4>

                <h4>
                  Status &nbsp; :-<span> {userprofle.status}</span>
                </h4>

                <h4>
                  <i class="fa-solid fa-calendar-days"></i>
                  &nbsp; Date Created :-
                  <span>
                    {" "}
                    {moment(userprofle.datecreated).format("DD-MM-YYYY")}
                  </span>
                </h4>

                <h4>
                  <i class="fa-solid fa-calendar-days"></i>
                  &nbsp; Date Updated :-<span> Date Updated</span>
                </h4>
              </div>
            </Card.Body>
          </Card>
        </div>
      )}
    </>
  );
};

export default Profile;
