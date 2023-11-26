import * as Yup from "yup";
import axios from "../axios";
import debounce from "lodash/debounce";

const asyncMailValidation = debounce(async function (value) {

    try {
        console.log("BAMMMMM")
        const response1 = await axios.post('/check-mail', {
                email: value
        });
        const data1 = response1.data;
  console.log(data1)
        return data1.isUnique ; // Assuming your API returns a boolean indicating email uniqueness
 
    } catch (error) {
        console.error('Error checking email:', error);
        return false; // Return false in case of an error
    }

}, 800);
 
export const signUpUser2Schema = Yup.object({

    title: Yup
        .string()
        .required("Please enter your Title"),
    fName: Yup
        .string()
        .min(2, "Must have atleast 2 characters")
        .max(25)
        .required("Please enter your Full Name"),
 
    dob: Yup
        .date()
        .required("Please enter your date of birth"),
    addr: Yup
        .string()
        .required("Must mention your Address"),
    duration: Yup
        .string()
        .required("Must mention your duration at the address"),
    info: Yup
        .string()
        .required("Please do mention few words about you."),    
})

export const financialSchema = Yup.object({
    status: Yup
        .string()
        .required("Please do enter the employment status"),
    savings: Yup
        .string()
        .required("Enter the savings/investments"),
})

export const signUpUserSchema = Yup.object({
    email: Yup
        .string()
        .email("Must be a valid mail")
        .test('unique-email', 'Email already exists', asyncMailValidation)
        .required("Your email address"),

    mob: Yup
        .string()
        .matches(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits")
        .required("Please enter your mobile number"),
    psswd: Yup
        .string()
        .min(6, "Password Must be atleast 6 Characters")
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
            "Password must contain at least one uppercase letter, one lowercase letter, and one digit"
        )
        .required("Enter your password"),

    cnfrm_psswd: Yup
        .string()
        .min(6, "Password Must be atleast 6 Characters")
        .required("You must enter the confirmed password")
        .oneOf([Yup.ref("psswd"), null], "Password Must Match")

})

export const loginSchema = Yup.object({
    email: Yup
        .string()
        .email()
        .required("Must enter a Valid Email"),
    psswd: Yup
        .string()
        .required("Password is required Field")
})

export const forgotSchema = Yup.object({
    email: Yup
        .string()
        .email()
        .required("Must enter a Valid Email"),
})

export const resetSchema = Yup.object({
    psswd: Yup
        .string()
        .min(6, "Password Must be atleast 6 Characters")
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
            "Password must contain at least one uppercase letter, one lowercase letter, and one digit"
        )
        .required("Enter your password"),

    cnfrm_psswd: Yup
        .string()
        .min(6, "Password Must be atleast 6 Characters")
        .required("You must enter the confirmed password")
        .oneOf([Yup.ref("psswd"), null], "Password Must Match"),
})