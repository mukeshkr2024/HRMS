import { Link } from "react-router-dom"

export const NotFound = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className=" p-8 rounded-lg  text-center">
                <h1 className="text-6xl font-bold text-gray-800">404</h1>
                <p className="text-2xl mt-4 text-gray-600">Page Not Found</p>
                <p className="mt-2 text-gray-500">Sorry, we couldn't find the page you're looking for.</p>
                <Link to="/">
                    <button className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700" >
                        Go to Home
                    </button>
                </Link>
            </div>
        </div>
    )
}
