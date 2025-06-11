import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ErrorBoundary = () => {
  const [hasError, setHasError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const errorHandler = (error) => {
      console.error("Uncaught error:", error);
      setHasError(true);
    };

    window.addEventListener("error", errorHandler);

    return () => {
      window.removeEventListener("error", errorHandler);
    };
  }, []);

  const handleGoBack = () => {
    setHasError(false);
    navigate(-1);
  };

  const handleGoHome = () => {
    setHasError(false);
    navigate("/");
  };

  if (hasError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Oops! Something went wrong
          </h1>
          <p className="text-gray-600 mb-6">
            We're sorry, but an unexpected error occurred. Our team has been
            notified and is working on a solution.
          </p>
          <div className="flex justify-between">
            <button
              onClick={handleGoBack}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
            >
              Go Back
            </button>
            <button
              onClick={handleGoHome}
              className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded"
            >
              Go to Homepage
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {" "}
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Oops! Something went wrong
          </h1>
          <p className="text-gray-600 mb-6">
            We're sorry, but an unexpected error occurred. Our team has been
            notified and is working on a solution.
          </p>
          <div className="flex justify-between">
            <button
              onClick={handleGoBack}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
            >
              Go Back
            </button>
            <button
              onClick={handleGoHome}
              className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded"
            >
              Go to Homepage
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ErrorBoundary;
