import { useState } from "react"
import { QrReader } from "react-qr-reader"
import { AlertCircle } from "lucide-react"
import { ScanLine } from "@/components/ScanLine" // Assuming ScanLine is in a separate file

const Scan1 = ()  =>{
  const [data, setData] = useState("No result")
  const [isScanning, setIsScanning] = useState(false)
  
  const handleResult = (result, error) => {
    if (!!result) {
      setData(result?.text)
      setIsScanning(false)
    }
    if (!!error) {
      console.error(error)
    }
  }
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden">
        {isScanning ? (
          <div className="relative w-full">
            <div className="w-full h-full">
              <QrReader
                onResult={handleResult}
                constraints={{ facingMode: "environment" }}
                containerStyle={{
                  width: "100%",
                  height: "100%",
                }}
                videoStyle={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
                scanDelay={500}
              />
            </div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-48 h-48 border-2 border-red-500 rounded-lg"></div>
              <ScanLine className="absolute text-red-500" size={200} />
            </div>
          </div>
        ) : (
          <div className="p-4">
            <button 
              onClick={() => setIsScanning(true)} 
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
            >
              Start Scanning
            </button>
          </div>
        )}
        {data !== "No result" && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-4">
            <div className="flex">
              <AlertCircle className="h-4 w-4 text-yellow-400" />
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">Scanned Result</h3>
                <div className="text-sm text-yellow-700 mt-1">{data}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Scan1