import { Html5QrcodeScanner } from "html5-qrcode"
import { useEffect, useState } from "react"

const Scan = () => {
  const [scanResult, setScanResult] = useState(null)
  
  useEffect(() => {
    // Define the success and error functions first
    const success = (result) => {
      scanner.clear()
      setScanResult(result)
    }
    
    const error = (err) => {
      console.warn(err)
    }
    
    const scanner = new Html5QrcodeScanner('reader', {
      qrbox: {
        width: 250,
        height: 250
      },
      fps: 5,
    })
    
    scanner.render(success, error)
    
    return () => {
      scanner.clear();
    }
  }, [])
  
  return (
    <div>
      <h1>QR scanner</h1>
      {scanResult ? 
        <div>
          <a href={"http://" + scanResult}>{scanResult}</a>
        </div> : 
        <div id="reader"></div>
      }
    </div>
  )
}

export default Scan