
import {Outlet} from "react-router-dom"
import Top from '../components/Top'

import "../scss/layouts/RegisterPage.scss"
function Root() {
 
  return (
    <>
        <Top />
        <Outlet />
    </>
  )
}

export default  Root