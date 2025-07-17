import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function VerifyEmail() {
  const location = useLocation();
  const navigate = useNavigate();
  const [status, setStatus] = useState('Verifying...');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');

    if (!token) {
      setStatus('❌ Invalid verification link.');
      return;
    }

    const verify = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/auth/verify?token=${token}`);
        setStatus(`✅ ${res.data}`);
        setSuccess(true);

        // Redirect after 5 seconds
        setTimeout(() => navigate('/auth'), 5000);
      } catch (err) {
        setStatus(`❌ Verification failed: ${err.response?.data || 'Something went wrong.'}`);
      }
    };

    verify();
  }, [location.search, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center p-6 bg-white shadow rounded max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Email Verification</h2>
        <p className={`text-sm ${success ? 'text-green-600' : 'text-red-600'}`}>{status}</p>

        {!success && (
          <button
            onClick={() => navigate('/auth')}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Go to Login
          </button>
        )}
      </div>
    </div>
  );
}
