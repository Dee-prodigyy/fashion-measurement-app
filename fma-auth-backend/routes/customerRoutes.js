const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');

// Helper function to transform measurements object to array
const transformMeasurements = (measurements) => {
  if (!measurements || typeof measurements !== 'object') {
    return [];
  }
  
  return Object.entries(measurements)
    .filter(([key, value]) => value && value.trim() !== '')
    .map(([key, value]) => ({
      type: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize first letter
      value: value
    }));
};

// Helper function to transform measurements array to object for saving
const transformMeasurementsToObject = (measurementsList) => {
  const measurementsObj = {};
  if (measurementsList && Array.isArray(measurementsList)) {
    measurementsList.forEach(m => {
      if (m.type && m.value) {
        const key = m.type.toLowerCase();
        measurementsObj[key] = m.value;
      }
    });
  }
  return measurementsObj;
};

router.post('/', async (req, res) => {
  try {
    const customerData = { ...req.body };
    
    // Transform measurements array to object for storage
    if (customerData.measurements && Array.isArray(customerData.measurements)) {
      const measurementsObj = transformMeasurementsToObject(customerData.measurements);
      customerData.measurements = measurementsObj;
    }
    
    // Map styleImage to image field for storage
    if (customerData.styleImage) {
      customerData.image = customerData.styleImage;
    }
    
    const newCustomer = new Customer(customerData);
    await newCustomer.save();
    res.status(201).json({ message: 'Customer saved', customer: newCustomer });
  } catch (error) {
    console.error('Error saving customer:', error);
    res.status(500).json({ message: 'Failed to save customer' });
  }
});

router.get('/', async (req, res) => {
  try {
    const customers = await Customer.find().sort({ createdAt: -1 });
    
    // Transform data for frontend
    const transformedCustomers = customers.map(customer => {
      const customerObj = customer.toObject();
      
      // Debug: Log the original measurements
      console.log('Original measurements for', customerObj.name, ':', customerObj.measurements);
      
      // Transform measurements object to array for frontend
      const measurementsArray = transformMeasurements(customerObj.measurements);
      
      // Debug: Log the transformed measurements
      console.log('Transformed measurements:', measurementsArray);
      
      return {
        ...customerObj,
        measurements: measurementsArray,
        // Map image to styleImage for frontend (prioritize image field)
        styleImage: customerObj.image || customerObj.styleImage || '',
        // Ensure required fields have defaults
        gender: customerObj.gender || 'Male',
        date: customerObj.date || new Date().toISOString().split('T')[0],
        style: customerObj.style || '',
        phone: customerObj.phone || ''
      };
    });
    
    res.status(200).json({ customers: transformedCustomers });
  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).json({ message: 'Failed to fetch customers' });
  }
});

module.exports = router;