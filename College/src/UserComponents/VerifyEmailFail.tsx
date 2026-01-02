// pages/VerifyEmailFail.js
function VerifyEmailFail() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Email Verification Failed</h1>
        <p className="text-gray-600 mb-4">
          The verification link is invalid or has expired.
        </p>
        
        <div className="space-y-3">
          <a 
            href="/IamUser/profile"
            className="block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200"
          >
            Go to Profile
          </a>
         
        </div>
      </div>
    </div>
  );
}

export default VerifyEmailFail;