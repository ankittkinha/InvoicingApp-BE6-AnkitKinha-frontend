import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";


const LoginPage = () => {

    const [requestResponse, setRequestResponse] = useState({
        textMessage: "",
        alertClass: ""
    })

    const initialValues = {
        email: "",
        password: ""
    }

    const onSubmit = (values) => {
        // console.log(values)
        axios.post("http://127.0.0.1:8000/api/user/login", values)
            .then((response) => {
                console.log(response.data.message)
                localStorage.setItem("token", response.data.token)
                localStorage.setItem("user", JSON.stringify(response.data.user))
                setRequestResponse({
                    textMessage: "Login Succesful. Thank You",
                    alertClass: "alert alert-success"
                })
            }, (error) => {
                setRequestResponse({
                    textMessage: error.response.data.message,
                    alertClass: "alert alert-danger"
                })
            })
            .catch(error => console.log(error))
    }

    const validationSchema = Yup.object({
        email: Yup.string().required("This is a required field.").email("Enter a valid email."),
        password: Yup.string().required("This is a required field.").min(6, "Password should be at least six characters long.")
    })

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                    <div className={styles.wrapper}>
                        <div className={requestResponse.alertClass}>
                            {requestResponse.textMessage}
                        </div>
                        <h2>Login</h2>
                        <hr />

                        <Formik
                            initialValues={initialValues}
                            onSubmit={onSubmit}
                            validationSchema={validationSchema}
                            validateOnMount={true}
                        >
                            {
                                (formik) => {
                                    return (
                                        <Form onSubmit={formik.handleSubmit}>
                                            <div className="form-group">
                                                <label htmlFor="email">Email</label>
                                                <Field type="text" name="email" id="email" className={formik.errors.email && formik.touched.email ? "form-control is-invalid" : "form-control"} />
                                                <ErrorMessage name="email">
                                                    {(errorMessage) => {
                                                        <small className="text-danger"> {errorMessage} </small>
                                                    }}
                                                </ErrorMessage>
                                            </div>


                                            <div className="form-group">
                                                <label htmlFor="password">Password</label>
                                                <Field type="text" name="password" id="password" className={formik.errors.password && formik.touched.password ? "form-control is-invalid" : "form-control"} />
                                                <ErrorMessage name="password">
                                                    {(errorMessage) => {
                                                        <small className="text-danger"> {errorMessage} </small>
                                                    }}
                                                </ErrorMessage>
                                            </div>

                                            <input type="submit" style={{marginTop: "20px"}} value="Login" className="btn btn-primary btn-block" disabled={!formik.isValid} />
                                        </Form>
                                    )
                                }
                            }

                        </Formik>

                        <br />
                        <p className="text-center">New User! <Link to="/user/signup" >Click Here</Link></p>
                    </div>
                </div>
                <div className="col-md-3"></div>
            </div>
        </div>
    )
}

export default LoginPage;