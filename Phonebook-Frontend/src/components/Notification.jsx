
const Notification = ({ notif }) => {
  if (notif === null) {
    return null
  }

  const notification = notif.type === 'error' ? 'notif error' : 'notif'

  return (
    <div className={notification}>
      {notif.message}
    </div>
  )
}

export default Notification