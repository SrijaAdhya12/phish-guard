import {Link} from 'react-router'

const Home = () => {
    return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <h1 className="text-4xl font-bold mb-6">Welcome to PhishGuard</h1>
        <p className="text-xl mb-8">
          Protect yourself from phishing attacks with our advanced image and URL detection technology.
        </p>
        <Link
          to="/scan"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition duration-300"
        >
          Start Scanning
        </Link>
      </div>
    </main>
    )
}

export default Home