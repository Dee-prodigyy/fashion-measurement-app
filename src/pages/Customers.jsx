import { useState, useEffect } from 'react';

// Simple UUID generator since uuid package isn't available
const generateId = () => Math.random().toString(36).substr(2, 9);

// Alternative transformation if measurements are stored as individual fields
const transformMeasurements = (customerObj) => {
  const measurementsArray = [];
     
  // Check if measurements is an object with individual fields
  if (customerObj.measurements && typeof customerObj.measurements === 'object') {
    Object.entries(customerObj.measurements).forEach(([key, value]) => {
      if (value && value.trim() !== '') {
        measurementsArray.push({
          type: key.charAt(0).toUpperCase() + key.slice(1),
          value: value
        });
      }
    });
  }
     
  // Also check for individual measurement fields at the root level
  const measurementFields = ['bust', 'waist', 'hips', 'inseam', 'neck', 'chest', 'shoulder'];
  measurementFields.forEach(field => {
    if (customerObj[field] && customerObj[field].trim() !== '') {
      measurementsArray.push({
        type: field.charAt(0).toUpperCase() + field.slice(1),
        value: customerObj[field]
      });
    }
  });
     
  return measurementsArray;
};

const measurementOptions = [
  "Neck", "Chest/Bust", "Waist", "Hip", "Shoulder", "Sleeve Length",
  "Arm Length", "Bicep", "Forearm", "Wrist", "Trouser Length", "Inseam",
  "Outseam", "Thigh", "Knee", "Calf", "Ankle", "Back Length",
  "Front Length", "Rise", "Laps"
];

export default function CustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState({
    id: '',
    name: '',
    gender: '',
    phone: '',
    date: new Date().toISOString().split('T')[0],
    style: '',
    styleImage: '',
    measurements: [{ id: generateId(), type: '', value: '' }]
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [modalImage, setModalImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [genderFilter, setGenderFilter] = useState('');

  const fetchCustomers = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/customers');
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      
      // Ensure we have a valid array of customers
      const customersArray = data.customers || data || [];
      
      // Transform measurements for each customer if needed
      const transformedCustomers = customersArray.map(customer => {
        // Ensure measurements is always an array
        if (!customer.measurements || !Array.isArray(customer.measurements)) {
          // If measurements come in a different format, transform them
          const transformedMeasurements = transformMeasurements(customer);
          return {
            ...customer,
            measurements: transformedMeasurements
          };
        }
        return customer;
      });
      
      setCustomers(transformedCustomers);
    } catch (error) {
      console.error('Error fetching customers:', error);
      setCustomers([]); // Set empty array on error
    }
  };

  // Rest of your component code remains the same...
  const filteredCustomers = customers.filter((c) => {
    const name = c.name || '';
    const phone = c.phone || '';
    const style = c.style || '';
    const gender = c.gender || '';
    
    const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        phone.includes(searchTerm) ||
                        style.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGender = genderFilter === '' || gender === genderFilter;
    return matchesSearch && matchesGender;
  });

  useEffect(() => {
    fetchCustomers();
  }, []);

  const resetForm = () => {
    setForm({
      id: '',
      name: '',
      gender: '',
      phone: '',
      date: new Date().toISOString().split('T')[0],
      style: '',
      styleImage: '',
      measurements: [{ id: generateId(), type: '', value: '' }]
    });
    setIsEditing(false);
    setEditingId(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleMeasurementChange = (id, field, value) => {
    const updated = form.measurements.map((m) =>
      m.id === id ? { ...m, [field]: value } : m
    );
    setForm(prev => ({ ...prev, measurements: updated }));
  };

  const addMeasurement = () => {
    setForm(prev => ({
      ...prev,
      measurements: [...prev.measurements, { id: generateId(), type: '', value: '' }]
    }));
  };

  const removeMeasurement = (id) => {
    setForm(prev => ({
      ...prev,
      measurements: prev.measurements.filter(m => m.id !== id)
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm(prev => ({ ...prev, styleImage: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setForm(prev => ({ ...prev, styleImage: '' }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/customers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        alert('✅ Customer saved successfully!');
        resetForm();
        fetchCustomers();
      } else {
        alert(`❌ Failed to save: ${data.message}`);
      }
    } catch (error) {
      console.error('Error saving customer:', error);
      alert('❌ Something went wrong while saving.');
    }
  };

  const handleEdit = (id) => {
    const customer = customers.find(c => c.id === id);
    if (customer) {
      setForm({ ...customer });
      setIsEditing(true);
      setEditingId(id);
    }
  };

  const handleDelete = (id) => {
    if (confirm("Delete this customer?")) {
      setCustomers(customers.filter(c => c.id !== id));
      if (editingId === id) resetForm();
    }
  };

  const openModal = (img) => {
    setModalImage(img);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalImage(null);
  };

  return (
    <main className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Customer Measurement Form</h1>

      <div className="space-y-4 bg-white p-6 rounded shadow">
        {/* Basic Info */}
        <div className="grid sm:grid-cols-2 gap-4">
          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleInputChange}
            className="p-2 border rounded"
            required
          />
          <select
            name="gender"
            value={form.gender}
            onChange={handleInputChange}
            className="p-2 border rounded"
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <input
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleInputChange}
            className="p-2 border rounded"
            required
          />
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleInputChange}
            className="p-2 border rounded"
            required
          />
        </div>

        {/* Measurements */}
        <div>
          <label className="block font-semibold mb-2">Measurements</label>
          <div className="space-y-3">
            {form.measurements.map((m) => (
              <div key={m.id} className="flex gap-2 items-center">
                <select
                  value={m.type}
                  onChange={(e) => handleMeasurementChange(m.id, 'type', e.target.value)}
                  className="p-2 border rounded flex-1"
                >
                  <option value="">Select type</option>
                  {measurementOptions.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="Value"
                  value={m.value}
                  onChange={(e) => handleMeasurementChange(m.id, 'value', e.target.value)}
                  className="p-2 border rounded w-24"
                />
                <button
                  type="button"
                  onClick={() => removeMeasurement(m.id)}
                  className="text-red-500 hover:underline text-sm"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addMeasurement}
            className="mt-2 text-blue-600 hover:underline text-sm"
          >
            + Add Measurement
          </button>
        </div>

        {/* Style Notes and Image */}
        <input
          type="text"
          name="style"
          placeholder="Style Note or Reference"
          value={form.style}
          onChange={handleInputChange}
          className="p-2 border rounded w-full"
        />

        <div>
          <label className="block font-semibold mb-1">Attach Style Image</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} className="p-2 border rounded w-full" />
          {form.styleImage && (
            <div className="mt-2 flex items-center gap-4">
              <img
                src={form.styleImage}
                alt="Preview"
                className="w-32 h-32 object-cover rounded shadow cursor-pointer"
                onClick={() => openModal(form.styleImage)}
              />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="text-red-600 hover:text-red-800 text-sm"
              >
                Remove
              </button>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            {isEditing ? "Update Customer" : "Save Customer"}
          </button>
          {isEditing && (
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </div>

      {/* Search & Filter */}
      <section className="mt-10">
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <input
            type="text"
            placeholder="Search by name, phone, or style"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border rounded w-full sm:w-1/2"
          />
          <select
            value={genderFilter}
            onChange={(e) => setGenderFilter(e.target.value)}
            className="p-2 border rounded w-full sm:w-1/4"
          >
            <option value="">All Genders</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <h2 className="text-xl font-semibold mb-3">Saved Customers</h2>
        {filteredCustomers.length === 0 ? (
          <p>No matching customers found.</p>
        ) : (
          <ul className="space-y-4">
            {filteredCustomers.map((c) => (
              <li
                key={c.id}
                className="p-4 bg-gray-50 dark:bg-gray-900 border rounded relative"
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-bold">
                    {c.name} ({c.gender})
                  </h3>
                  <div className="space-x-2">
                    <button
                      onClick={() => handleEdit(c.id)}
                      className="text-blue-600 hover:underline text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(c.id)}
                      className="text-red-600 hover:underline text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <p>📞 {c.phone} • 📅 {c.date}</p>
                <p>Style: {c.style || "N/A"}</p>

                {c.styleImage && (
                  <img
                    src={c.styleImage}
                    alt={`${c.name}'s style`}
                    className="mt-2 w-32 h-32 object-cover rounded shadow cursor-pointer"
                    onClick={() => openModal(c.styleImage)}
                  />
                )}

                <ul className="mt-2 text-sm list-disc pl-5">
                  {(c.measurements || []).map((m, i) => (
                    <li key={i}>
                      {m.type}: {m.value}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Image Modal */}
      {showModal && modalImage && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-white bg-red-600 px-2 py-1 rounded hover:bg-red-700"
            >
              ✕
            </button>
            <img
              src={modalImage}
              alt="Full Preview"
              className="max-w-full max-h-[90vh] rounded shadow-lg"
            />
          </div>
        </div>
      )}
    </main>
  );
}