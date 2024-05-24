import { useEffect, useState } from "react"
import "./pages_stylesheet.css"

function GetDateTime() {
  const cd = new Date()
  const yr = cd.getFullYear()
  const mo = String(cd.getMonth() + 1).padStart(2, "0")
  const dy = String(cd.getDate()).padStart(2, "0")
  const ho = String(cd.getHours()).padStart(2, "0")
  const mn = String(cd.getMinutes()).padStart(2, "0")
  const sc = String(cd.getSeconds()).padStart(2, "0")

  const DateTime = `${yr}-${mo}-${dy} - ${ho}:${mn}:${sc}`
  return DateTime
}

function HelloWorld() {
  useEffect(() => {
    document.title = "Sorry"
  }, [])

  const [datetime, set_datetime] = useState("")

  setInterval(function () {
    set_datetime(GetDateTime())
  }, 1000)

  return (
    <div className="helloworld-maincontainer">
      <div className="helloworld-underconst">
        <img
          className="helloworld-image"
          alt="Under Construction"
          src="notdoneyet.PNG"
        />
        <h2><b>This page is under construction.</b></h2>
        {datetime}
      </div>
    </div>
  )
}

export default HelloWorld
