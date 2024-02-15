import { Link,useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import React, { useState } from "react";


const RegisterPage = () => {

    const navigate = useNavigate()
    
    const [requestResponse, setRequestResponse] = useState({
        textMessage: "",
        alertClass: ""
    })

    const initialValues = {
        name: "",
        email: "",
        mobile: "",
        password: ""
    }

    const onSubmit = (values) => {
        // console.log(values)
        axios.post("http://127.0.0.1:8000/api/user/signup", values)
            .then((response) => {
                console.log(response.data)
                console.log(response)
                setRequestResponse({
                    textMessage: response.data.message,
                    alertClass: "alert alert-success"
                })
                setTimeout(() => {
                    navigate("/user/login")
                }, 3000)
                
            }, (error) => {
                console.log(error)
                setRequestResponse({
                    textMessage: error.response.data.message,
                    alertClass: "alert alert-danger"
                })
            })
            .catch(error => console.log(error))
    }

    const validationSchema = Yup.object({
        name: Yup.string().required("This is a required field."),
        email: Yup.string().required("This is a required field.").email("Enter a valid email."),
        mobile: Yup.string().required("This is a required field."),
        password: Yup.string().required("This is a required field.").min(6, "Password should be at least six characters long.")
    })

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema,
        validateOnMount: true
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
                        <h2>Register</h2>
                        <hr />
                        <form onSubmit={formik.handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">First Name</label>
                                <input type="text" name="name" id="name" values={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} className={formik.errors.name && formik.touched.name ? "form-control is-invalid" : "form-control"} />
                                {formik.errors.name && formik.touched.name ? (<small className="text-danger"> {formik.errors.name} </small>) : null}
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="text" name="email" id="email" values={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} className={formik.errors.email && formik.touched.email ? "form-control is-invalid" : "form-control"} />
                                {formik.errors.email && formik.touched.email ? (<small className="text-danger"> {formik.errors.email} </small>) : null}
                            </div>

                            <div className="form-group">
                                <label htmlFor="mobile">Mobile</label>
                                <input type="text" name="mobile" id="mobile" values={formik.values.mobile} onChange={formik.handleChange} onBlur={formik.handleBlur} className={formik.errors.mobile && formik.touched.mobile ? "form-control is-invalid" : "form-control"} />
                                {formik.errors.mobile && formik.touched.mobile ? (<small className="text-danger"> {formik.errors.mobile} </small>) : null}
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="text" name="password" id="password" values={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} className={formik.errors.password && formik.touched.password ? "form-control is-invalid" : "form-control"} />
                                {formik.errors.password && formik.touched.password ? (<small className="text-danger"> {formik.errors.password} </small>) : null}
                            </div>

                            <input type="submit" style={{marginTop: "20px"}} value="Register" className="btn btn-primary btn-block" disabled={!formik.isValid} />
                        </form>

                        <br />
                        <p className="text-center" >Already Registered? <Link to="/user/login" >Click Here</Link></p>
                    </div>
                </div>
                <div className="col-md-3"></div>
            </div>
        </div>
    )
}

export default RegisterPage;