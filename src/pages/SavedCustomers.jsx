import { useEffect, useState } from 'react';

export default function SavedCustomers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch customers from backend
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/customers');
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        
        // Ensure customers is an array and each customer has measurements array
        const customersWithDefaults = (data.customers || []).map(customer => ({
          ...customer,
          measurements: customer.measurements || [],
          style: customer.style || '',
          styleImage: customer.styleImage || ''
        }));
        
        setCustomers(customersWithDefaults);
      } catch (err) {
        console.error('Error fetching customers:', err);
        setError('Failed to load customers.');
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">📋 Saved Customers</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && customers.length === 0 && (
        <p>No customer records found.</p>
      )}

      <div className="space-y-6">
        {customers.map((c) => (
          <div
            key={c._id || c.id}
            className="border p-5 rounded-lg shadow bg-white dark:bg-gray-800"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">{c.name || 'Unknown'}</h2>
              <span className="text-sm text-gray-500">{c.gender || 'N/A'}</span>
            </div>

            <p className="text-sm text-gray-700 mt-1">
              📞 {c.phone || 'N/A'} &bull; 🗓️ {c.date || 'N/A'}
            </p>

            <p className="mt-2 font-medium">
              Style Note: <span className="text-gray-800">{c.style || 'N/A'}</span>
            </p>

            {c.styleImage && (
              <div className="mt-3">
                <img
                  src={c.styleImage}
                  alt={`${c.name || 'Customer'} style`}
                  className="w-32 h-32 object-cover rounded border"
                />
              </div>
            )}

            <div className="mt-4">
              <h3 className="font-semibold">Measurements:</h3>
              {c.measurements && c.measurements.length > 0 ? (
                <ul className="list-disc ml-6 text-sm mt-1">
                  {c.measurements.map((m, i) => (
                    <li key={i}>
                      {m.type || 'Unknown'}: {m.value || 'N/A'}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500 mt-1">No measurements recorded</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}