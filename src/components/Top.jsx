import "../scss/components/Top.scss"
const Top = () => {
  return (
    <div className="header">
      <img src="/images/Logo.png" alt=""  style={{width:"8rem",marginLeft:"2rem"}}/>
      <i style={{marginRight:"1.5rem"}} className="fa-regular fa-circle-question"></i> 
    </div>
  )
}

export default Top