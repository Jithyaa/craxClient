import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { signUpUserSchema } from "../schemas";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify"
import { useDispatch } from "react-redux";
// import axios from "axios";
import { Dna } from "react-loader-spinner"
import axios from "../axios";
import "../scss/screen/Register.scss"
import { createAccount } from "../toolkit/slices/user/userSlice";
function RegisterStage1() {

    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
         
        
        setIsLoading(false);
        return () => {
             
        };
    }, []);
    const initialValues = {
        email: "",
        mob: "",
        psswd: "",
        cnfrm_psswd: "",

    }
    const { values, errors, touched, handleBlur,handleFocus,handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: signUpUserSchema,
        onSubmit: async (values, action) => {
            setData(values);
            console.log(values.email)
            let response = await axios.post('/create-account', {
                email:values.email,
                mob:values.mob,
                psswd:values.cnfrm_psswd
            })
            if(response.data.success){
                dispatch(createAccount({email:values.email,mob:values.mob}))
                navigate("/user/register/1")
            }
            //    return
        }
    })




    return (
        <>
            {isLoading &&
                <Dna
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="dna-loading"
                    wrapperStyle={{ position: "fixed", zIndex: "100", width: "100%", height: "20%", top: "40%" }}
                    wrapperClass="dna-wrapper"
                />
            }
            {
                !isLoading &&

                <div className="register-container">


                    <form className="register-form" onSubmit={handleSubmit}>

                            <span>
                                <h4>Create your account</h4>
                                <p>Set-up your RentlyPass in as little as 2 minutes.</p>
                            </span>
                        <div className="section">
                        <h4>Contact Details </h4>
                            <div className="inp-block">
                                <div className="input-block">
                                    <input
                                        type="email"
                                        autoComplete="on"
                                        name="email"
                                        id="email"
                                        value={values.email}
                                        placeholder=" "
                                        onChange={handleChange}
                                        onFocus={handleFocus}
                                        onBlur={handleBlur}
                                    />
                                    <label htmlFor="email" className='labelLine'> 
                                        Email Address
                                    </label>
                                    {errors.email && touched.email ? <p>{errors.email}</p> : null}
                                </div>

                                <div className="input-block">
                                    <input
                                        type="number"
                                        autoComplete="off"
                                        name="mob"
                                        id="mob"
                                        maxLength="10"
                                        placeholder=" "
                                        value={values.mob}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    <label htmlFor="mob" className='labelLine'>
                                        Mobile Number
                                    </label>
                                    {errors.mob && touched.mob ? <p>{errors.mob}</p> : null}
                                </div>


                            </div>
                        </div>



                        <div className="section">
                            <h4> Set a password </h4>
                            <div className="inp-block">
                                <div className="input-block">
                                    <input
                                        type="password"
                                        autoComplete="off"
                                        name="psswd"
                                        id="psswd"
                                        placeholder=" "
                                        value={values.psswd}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    <label htmlFor="psswd" className='labelLine'>
                                        Create a Password
                                    </label>
                                    {errors.psswd && touched.psswd ? <p>{errors.psswd}</p> : null}
                                </div>
                                <div className="input-block">
                                    
                                    <input
                                        type="password"
                                        autoComplete="off"
                                        name="cnfrm_psswd"
                                        id="cnfrm_psswd"
                                        placeholder=" "
                                        value={values.cnfrm_psswd}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    <label htmlFor="cnfrm_psswd" className='labelLine'>
                                        Confirm your password
                                    </label>
                                    {errors.cnfrm_psswd && touched.cnfrm_psswd ? <p>{errors.cnfrm_psswd}</p> : null}
                                </div>
                            </div>
                        </div>

                        <p><span><i className="fa-solid fa-circle-exclamation"></i></span> We need a password to keep your information safe. But don't worry, we'll also send you custom RentlyPass URL via email </p>
                        <button type="submit">Create your account</button>
                        <p> By clicking 'Create your account', you are agreeing to our <a href="">Terms & Conditions</a> and <a href="">Privacy Policy</a>  </p>
                    </form>
                     
                </div>
            }
        </>
    )
}

export default RegisterStage1