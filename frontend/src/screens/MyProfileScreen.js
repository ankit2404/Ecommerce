import { useState, useEffect } from "react";
import { Form } from 'react-bootstrap'
import classes from "../styles/profile.module.css";
import { useDispatch, useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
// import Message from '../components/Message'
// import Loader from '../components/Loader'
import { getUserDetails, updateUserProfile } from '../actions/userAction'
import { USER_UPDATE_PROFILE_RESET  } from '../constants/userConstants'
function MyProfileScreen({ location, history }) {
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState("");
  const [lastName, setLastname] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const { success } = userUpdateProfile

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET })
        dispatch(getUserDetails('profile'))
      } else {
        setName(user.name)
        setEmail(user.email)
        setLastname(user.lastName)
        setDob(user.dob)
        setPhone(user.phone)
        setGender(user.gender)
        setCity(user.city)
        setAddress(user.address)
        setCountry(user.country)
      }
    }
  }, [dispatch, history, userInfo, user, success])
  

  const editHandler = () => {
    setEdit(!edit);
  };

  const submitHandler = (e) => {
    e.preventDefault()
    setEdit(!edit);
    dispatch(updateUserProfile({ id: user._id, name, lastName, gender,city,address,phone,dob,country }))
  }
  return (
    <div className={`${classes["main-content"]}`}>
      <div
        className={`${classes["header"]} ${classes["pb-8"]} ${classes["pt-5"]} ${classes["pt-lg-8"]} ${classes["d-flex"]} ${classes["align-items-center"]} ${classes["mycll"]}`}
        style={{ minHeight: "500px" }}
      >
        <span
          className={`${classes["mask"]} ${classes["bg-gradient-default"]} ${classes["opacity-8"]}`}
        ></span>
        <div
          className={`${classes["container-fluid"]} ${classes["d-flex"]} ${classes["align-items-center"]}`}
        >
          <div className={classes.row}>
            <div className={classes.okk}>
              <div className={classes.okk}>
                <h1
                  className={`${classes["display-2"]} ${classes["text-white"]}`}
                >
                  Hello {name} {lastName}
                </h1>
              </div>
              <h3 className={`${classes["text-white"]}`}>{user.isAdmin? 'Admin': 'User'}</h3>
            </div>
          </div>
        </div>
      </div>
      <div className={`${classes["container-fluid"]} ${classes["mt--7"]}`}>
        <div className={classes.row}>
          <div
            className={`${classes["col-xl-4"]} ${classes["order-xl-2"]} ${classes["mb-5"]} ${classes["mb-xl-0"]}`}
          >
            <div
              className={`${classes["card"]} ${classes["card-profile"]} ${classes["shadow"]}`}
            >
              <div
                className={`${classes["row"]} ${classes["justify-content-center"]}`}
              >
                <div
                  className={`${classes["col-lg-3"]} ${classes["order-lg-2"]}`}
                >
                  <div className={`${classes["card-profile-image"]}`}>
                    <img
                      src="https://cdn.statically.io/img/www.celebrities-contact.com//wp-content/uploads/2019/07/mackenzie-ziegler-email-phone-contact-732.jpg"
                      alt="ghv"
                      className={`${classes["rounded-circle"]}`}
                    />
                  </div>
                </div>
              </div>
              <div
                className={`${classes["card-header"]} ${classes["text-center"]} ${classes["border-0"]} ${classes["pt-8"]} ${classes["pt-md-4"]} ${classes[" pb-0"]} ${classes["pb-md-4"]}`}
              ></div>
              <div
                className={`${classes["card-body"]} ${classes["pt-0"]} ${classes["pt-md-4"]}`}
              >
                <div className={classes.row}>
                  <div className={classes.col}>
                    <div
                      className={`${classes["card-profile-stats"]} ${classes["d-flex"]} ${classes["justify-content-center"]} ${classes["mt-md-5"]}`}
                    ></div>
                  </div>
                </div>
                <div className={`${classes["text-center"]} `}>
                  <h3>{name} {lastName}</h3>
                  <div
                    className={`${classes["h5 "]} ${classes["font-weight-300"]} `}
                  >
                    {city}  {country}
                  </div>
                </div>
              </div>
              <div
                className={classes.hh}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  textAlign: "center",
                }}
              >
                <Link
                  to="/myorder"
                  className={`${classes["btn"]} ${classes["btn-info"]} ${classes["mybtn"]}`}
                  id="view-doc"
                >
                  View My Orders
                </Link>
                <a
                  href="https://forms.gle/WkcecAxK1ZLYLAZL9"
                  target="_blank"
                  className={`${classes["btn"]} ${classes["btn-info"]} ${classes["mybtn"]}`}
                  id="leave"
                  rel="noreferrer"
                >
                  Apply For Leave
                </a>
                <a
                  href="/users"
                  className={`${classes["btn"]} ${classes["btn-info"]} ${classes["mybtn"]}`}
                  id="admin-right"
                  style={{ marginBottom: "5%" }}
                >
                  Users Information
                </a>
              </div>
            </div>
          </div>

          <div className={`${classes["col-xl-8"]} ${classes["order-xl-1"]}`}>
            <div
              className={`${classes["card"]} ${classes["bg-secondary"]} ${classes["shadow"]}`}
            >
              <div
                className={`${classes["card-header"]} ${classes["bg-white"]} ${classes["border-0"]}`}
              >
                <div
                  className={`${classes["row"]} ${classes["align-items-center"]}`}
                >
                  <div className={`${classes["col-8"]}`}>
                    <h3 className={`${classes["mb-0"]}`}>My account</h3>
                  </div>
                  <div
                    className={`${classes["col-4"]} ${classes["text-right"]} `}
                  >
                    <button
                      className={`${classes["btn"]} ${classes["btn-sm"]} ${classes["btn-primary"]}`}
                      id="edit-info"
                      onClick={editHandler}
                    >
                      Edit Profile
                    </button>
                    <Link to = '/changepassword'
                      className={`${classes["btn"]} ${classes["btn-sm"]} ${classes["btn-primary"]}`}
                      id="change-pass"
                    >
                      Change Password
                    </Link>
                  </div>
                </div>
              </div>
              <div className={`${classes["card-body"]}`}>
                <Form onSubmit={submitHandler}>
                  <h6
                    className={`${classes["heading-small"]} ${classes["text-muted"]} ${classes["mb-4"]}`}
                  >
                    {name} Personal information
                  </h6>
                  <div className={`${classes["pl-lg-4"]}`}>
                    <div className={classes.row}>
                      <div className={`${classes["col-lg-6"]}`}>
                        <div
                          className={`${classes["form-group"]} ${classes["focused"]}`}
                        >
                          <label
                            className={`${classes["form-control-label"]}`}
                            htmlFor="input-username"
                          >
                            First Name
                          </label>
                          <input
                            className={`${classes["form-control"]} ${classes["form-control-alternative"]}`}
                            type="text"
                            placeholder="Enter your First name"
                            disabled={!edit}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className={`${classes["col-lg-6"]}`}>
                        <div className={`${classes["form-group"]}`}>
                          <label
                            className={`${classes["form-control-label"]}`}
                            htmlFor="input-email"
                          >
                            Last Name
                          </label>
                          <input
                            type="text"
                            placeholder="Enter your last name"
                            className={`${classes["form-control"]} ${classes["form-control-alternative"]}`}
                            disabled={!edit}
                            value={lastName}
                            onChange={(e) => setLastname(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className={classes.row}>
                      <div className={`${classes["col-lg-6"]}`}>
                        <div
                          className={`${classes["form-group"]} ${classes["focused"]}`}
                        >
                          <label
                            className={`${classes["form-control-label"]}`}
                            htmlFor="input-first-name"
                          >
                            Email Address
                          </label>

                          <input
                            type="email"
                            placeholder="Enter your email"
                            className={`${classes["form-control"]} ${classes["form-control-alternative"]}`}
                            disabled
                            value={email}
                          />
                        </div>
                      </div>
                      <div className={`${classes["col-lg-6"]}`}>
                        <div
                          className={`${classes["form-group"]} ${classes["focused"]}`}
                        >
                          <label
                            className={`${classes["form-control-label"]}`}
                            htmlFor="input-last-name"
                          >
                            Phone Number
                          </label>
                          <input
                            type="number"
                            placeholder="Enter your number"
                            className={`${classes["form-control"]} ${classes["form-control-alternative"]}`}
                            disabled={!edit}
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className={classes.row}>
                      <div className={`${classes["col-lg-6"]}`}>
                        <div
                          className={`${classes["form-group"]} ${classes["focused"]}`}
                        >
                          <label
                            className={`${classes["form-control-label"]}`}
                            htmlFor="input-first-name"
                          >
                            Gender
                          </label>
                          <select
                            name="gender"
                            className={`${classes["form-control"]} ${classes["form-control-alternative"]}`}
                            disabled={!edit}
                            onChange={(e) => setGender(e.target.value || null)}
                            value={gender || ""}
                          >
                            <option value="Choose">Select your gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Prefer not to say">
                              Prefer not to say
                            </option>
                          </select>
                        </div>
                      </div>
                      <div className={`${classes["col-lg-6"]}`}>
                        <div
                          className={`${classes["form-group"]} ${classes["focused"]}`}
                        >
                          <label
                            className={`${classes["form-control-label"]}`}
                            htmlFor="input-last-name"
                          >
                            Date Of Birth
                          </label>
                          <input
                            className={`${classes["form-control"]} ${classes["form-control-alternative"]}`}
                            type="date"
                            disabled={!edit}
                            value={dob}
                            onChange={(e) => setDob(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <hr className={`${classes["my-4"]}`}/> */}
                  <h6
                    className={`${classes["heading-small"]} ${classes["text-muted"]} ${classes["mb-4"]}`}
                  >
                    Location
                  </h6>
                  <div className={`${classes["pl-lg-4"]}`}>
                    <div className={classes.row}>
                      <div className={`${classes["col-md-12"]}`}>
                        <div
                          className={`${classes["form-group"]} ${classes["focused"]}`}
                        >
                          <label
                            className={`${classes["form-control-label"]}`}
                            htmlFor="input-address"
                          >
                            Address
                          </label>
                          <input
                            type="text"
                            placeholder="Enter your address"
                            className={`${classes["form-control"]} ${classes["form-control-alternative"]}`}
                            disabled={!edit}
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className={classes.row}>
                      <div className={`${classes["col-lg-6"]}`}>
                        <div
                          className={`${classes["form-group"]} ${classes["focused"]}`}
                        >
                          <label
                            className={`${classes["form-control-label"]}`}
                            htmlFor="input-country"
                          >
                            Country
                          </label>
                          <input
                            type="text"
                            placeholder="Enter your country"
                            className={`${classes["form-control"]} ${classes["form-control-alternative"]}`}
                            disabled={!edit}
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className={`${classes["col-lg-6"]}`}>
                        <div
                          className={`${classes["form-group"]} ${classes["focused"]}`}
                        >
                          <label
                            className={`${classes["form-control-label"]}`}
                            htmlFor="input-city"
                          >
                            City
                          </label>
                          <input
                            type="text"
                            placeholder="Enter your city"
                            className={`${classes["form-control"]} ${classes["form-control-alternative"]}`}
                            disabled={!edit}
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {edit && (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        padding: "15px",
                      }}
                    >
                      <button
                        className={`${classes["btn"]} ${classes["btn-primary"]}`}
                        type="submit"
                        style={{ paddingLeft: "5%", paddingRight: "5%" }}
                      >
                        Submit
                      </button>
                    </div>
                  )}
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyProfileScreen;
