const AlertMsg = ({ msgType, msg }) => {
  return (
    msgType &&
    <h2 className={`mt-3 alert ${ msgType === 'Error' ? 'alert-danger' : 'alert-success'}`} htmlFor={'Result heading'}>
      { msg }
    </h2>
  )
}

export default AlertMsg