import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { financialSchema } from "../schemas";
import { Link, useNavigate } from "react-router-dom";
import {useSelector,useDispatch} from "react-redux"
import { saveFinancialData } from "../toolkit/slices/user/userSlice";
import { ToastContainer, toast } from "react-toastify"
// import axios from "axios";
import { Dna } from "react-loader-spinner"
import axios from "../axios";
import "../scss/screen/personalDetail.scss"
function FinancialDet() {
    let data2 = useSelector(state => state?.user?.user);    
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(false);
    }, []);
    const initialValues = {
        status: data2?.status || "",
        savings: data2?.savings || null
    }
    const { values, errors, touched, handleBlur, handleFocus, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: initialValues,
        validationSchema: financialSchema,
        onSubmit: async (values, action) => {
            dispatch(saveFinancialData({
                status: values.status,
                savings:values.savings
            }))
            let response = await axios.post("/save-data",{
                ...data2,...values
            })

            navigate('/home')
        }
    })
     

    function handleChangeV2(e) {
        setFieldValue('status', e.target.value);
    }

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
                        <Link to="/user/register/1" className="button"  >1</Link>
                        <Link to="/user/register/2" className="button active"  >2</Link>
                    </div>
                    <form className="register-form" onSubmit={handleSubmit}>

                        <span>
                            <h4>Financial Information</h4>
                            <p>All your information is stored securely</p>
                        </span>
                        <div className="section">

                            <div className="inp-block">
                                <div className="input-block">
                                    <div className="dropdown">
                                        <select id="title" name="title" className="input" onChange={(e) => handleChangeV2(e)} value={values.status}>
                                            <option selected disabled value="">Choose your current employment status</option>
                                            <option value="employed">Employed</option>
                                            <option value="unemployed">Unemployed</option>
                                            <option value="selfEmployed">Self-employed</option>
                                            <option value="student">Student</option>
                                            <option value="retired">Retired</option>
                                            <option value="other">Other</option>
                                        </select>

                                    </div>

                                    {errors.status && touched.status ? <p>{errors.status}</p> : null}
                                </div>
                                <div className="input-block">
                                    <input
                                        type="number"
                                        autoComplete="off"
                                        name="savings"
                                        id="savings"
                                        maxLength="10"
                                        placeholder="Additional savings/investments"
                                        value={values.savings}
                                        onFocus={handleFocus}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {errors.savings && touched.savings ? <p>{errors.savings}</p> : null}
                                </div>


                            </div>
                        </div>
                        <button type="submit">Save and continue</button>
                    </form>

                </div>
            }
        </>
    )
}

export default FinancialDet