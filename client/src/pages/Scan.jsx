import { useState, useEffect } from 'react';
import { QrReader } from 'react-qr-reader';
import { Camera, ScanLine } from 'lucide-react';

const Scan = () => {
  const [data, setData] = useState('No result');
  const [error, setError] = useState(null);
  const [permission, setPermission] = useState('checking');
  const [startScanner, setStartScanner] = useState(false);

  const handlePermissions = async () => {
    try {
      const permissions = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      setPermission('granted');
      permissions.getTracks().forEach(track => track.stop());
      setStartScanner(true);
    } catch (err) {
      console.error('Permission error:', err);
      setPermission('denied');
      setError(err.message);
    }
  };

  useEffect(() => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setError('Your browser does not support camera access');
      setPermission('unsupported');
      return;
    }

    handlePermissions();
  }, []);

  const requestPermission = () => {
    setPermission('checking');
    handlePermissions();
  };

  return (
    <main className="w-full max-w-lg mx-auto p-4">
      {permission === 'checking' && (
        <div className="mb-4 p-4 bg-yellow-100 text-yellow-700 rounded flex items-center gap-2">
          <Camera className="w-5 h-5" />
          <span>Checking camera permissions...</span>
        </div>
      )}

      {permission === 'denied' && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
          <p>Camera permission is required. Please check your browser settings and ensure camera access is allowed.</p>
          <p className="mt-2">Error: {error}</p>
          <button 
            onClick={requestPermission}
            className="mt-4 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Try Again
          </button>
        </div>
      )}

      {permission === 'unsupported' && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      {permission === 'granted' && startScanner && (
        <>
          <div className="relative aspect-square w-full bg-black overflow-hidden rounded-lg">
            <QrReader
              onResult={(result, error) => {
                if (result) {
                  setData(result.text);
                }
                if (error) {
                  console.info('QR Error:', error);
                }
              }}
              constraints={{
                facingMode: 'environment',
                aspectRatio: 1
              }}
              videoStyle={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
              ViewFinder={() => (
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* Transparent overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-50" />
                  
                  {/* Scanning window */}
                  <div className="relative w-64 h-64 bg-transparent">
                    {/* Cutout window */}
                    <div className="absolute inset-0 border-8 border-white border-opacity-50 rounded-lg" />
                    
                    {/* Corner markers */}
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-blue-500 rounded-tl" />
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-blue-500 rounded-tr" />
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-blue-500 rounded-bl" />
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-blue-500 rounded-br" />
                    
                    {/* Scanning animation */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-blue-500 animate-scan" />
                  </div>
                </div>
              )}
            />
          </div>

          <div className="mt-4 p-4 bg-gray-100 rounded">
            <p className="font-medium">Scanned Result:</p>
            <p className="break-all">{data}</p>
          </div>
        </>
      )}

      <style jsx>{`
        @keyframes scan {
          0% { transform: translateY(0); }
          50% { transform: translateY(256px); }
          100% { transform: translateY(0); }
        }
        .animate-scan {
          animation: scan 2s linear infinite;
        }
      `}</style>
    </main>
  );
};

export default Scan;