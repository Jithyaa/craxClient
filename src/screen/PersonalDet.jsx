import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { signUpUser2Schema } from "../schemas";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { saveInfo } from "../toolkit/slices/user/userSlice";
import { ToastContainer, toast } from "react-toastify"
// import axios from "axios";
import { Dna } from "react-loader-spinner"
import axios from "../axios";
import "../scss/screen/personalDetail.scss"
function PersonalDet() {
    let data2 = useSelector(state => state.user?.user);
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [otp, setOtp] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {


        setIsLoading(false);
        return () => {

        };
    }, []);
    const initialValues = {
         title:data2?.title || "",
         fName:data2?.fName || "",
         dob:data2?.dob || "1999-11-12",
         addr:data2.addr || "",
         duration:data2?.duration || "",
         info:data2?.info || "",

    }
    const { values, errors, touched, handleBlur, handleFocus, handleChange, handleSubmit ,setFieldValue} = useFormik({
        initialValues: initialValues,
        validationSchema: signUpUser2Schema,
        onSubmit: async (values, action) => {
           dispatch(saveInfo({
            title:values.title,
            fName:values.fName,
            dob:values.dob,
            addr:values.addr,
            duration:values.duration,
            info:values.info
           }))
           navigate("/user/register/2")
        }
    })

console.log(values)


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
                    <div className="navigate">
                        <Link to="/user/register/1" className="button active"  >1</Link>
                        <Link to="/user/register/2" className="button"  >2</Link>
                    </div>

                    <form className="register-form" onSubmit={handleSubmit}>

                        <span>
                            <h4>Personal Information</h4>
                            <p>Please answer questions as accurately as possible</p>
                        </span>
                        <div className="section">
                            <h4>Contact Details </h4>
                            <div className="inp-block">
                                <div className="input-block wxc">
                                    <div className="dropdown">
                                        <select id="title" name="title" className="input" onChange={(e)=>setFieldValue('title',e.target.value)} value={values.title}>
                                            {/* <option disabled value="">Title</option> */}
                                            <option  value="Mr">Mr</option>
                                            <option value="Mrs">Mrs</option>
                                            <option value="Ms">Ms</option>
                                        </select>

                                    </div>
                                    <div className="dpec">
                                        <input
                                            type="text"
                                            autoComplete="on"
                                            name="fName"
                                            id="fName"
                                            value={values.fName}
                                            placeholder=" "
                                            onChange={handleChange}
                                            onFocus={handleFocus}
                                            onBlur={handleBlur}
                                        />
                                    <label htmlFor="fName" className='labelLineV2'>
                                        Full Name as per your passport
                                    </label>
                                        {errors.fName && touched.fName ? <p>{errors.fName}</p> : null}
                                    </div>
                                </div>

                                <div className="input-block">
                                    <input
                                        type="date"
                                        autoComplete="off"
                                        name="mob"
                                        id="mob"
                                        maxLength="10"
                                        placeholder=" "
                                        value={new Date(Number(values.dob.split("-")[0]),Number(values.dob.split("-")[1])-1,Number(values.dob.split("-")[2])+1).toISOString().split('T')[0]}
                                        onChange={(e)=>setFieldValue('dob',e.target.value)}
                                        onBlur={handleBlur}
                                    />
                                    <label htmlFor="mob" className='labelLineV2'>
                                        Date of birth
                                    </label>
                                    {errors.dob && touched.dob ? <p>{errors.dob}</p> : null}
                                </div>


                            </div>


                            <div className="inp-block">
                                <div className="input-block">
                                    <input
                                        type="text"
                                        autoComplete="off"
                                        name="addr"
                                        id="addr"
                                        placeholder=" "
                                        value={values.addr}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    <label htmlFor="addr" className='labelLineV2'>
                                        Current Address
                                    </label>
                                    {errors.addr && touched.addr ? <p>{errors.addr}</p> : null}
                                </div>
                                <div className="input-block">

                                    <input
                                        type="number"
                                        autoComplete="off"
                                   
                                        name="duration"
                                        id="duration"
                                        placeholder="How long have you lived at this address ?"
                                        value={values.duration}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />

                                    {errors.duration && touched.duration ? <p>{errors.duration}</p> : null}
                                </div>
                                <div className="input-block">

                                    <textarea
                                        type="text"
                                        autoComplete="off"
                                        name="info"
                                        id="info"
                                        placeholder="Tell us a bit about yourself. (what are you like as a person, do you haveany hobbies.etc)?"
                                        value={values.info}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />

                                    {errors.info && touched.info ? <p>{errors.info}</p> : null}
                                </div>
                            </div>
                        </div>

                        <p><span><i className="fa-solid fa-circle-exclamation"></i></span> All information can be edited once you have created your account. </p>
                        <button type="submit">Save and continue</button>

                    </form>

                </div>
            }
        </>
    )
    }

export default PersonalDet