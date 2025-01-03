import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function UploadPage() {
  // Define state variables for form fields
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    seller: '',
    stock: '',
  });
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Handle input change for form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    setImages(e.target.files);
  };

  // Submit form data
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (images.length === 0) {
      toast.error('Please select at least one image.');
      return;
    }

    const submissionData = new FormData();
    Object.keys(formData).forEach((key) => {
      submissionData.append(key, formData[key]);
    });
    Array.from(images).forEach((file) => {
      submissionData.append('images', file);
    });

    try {
      setIsLoading(true);
      const response = await axios.post('http://localhost:5000/api/products/upload', submissionData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      toast.success('Product uploaded successfully!');
      console.log('Product uploaded:', response.data);

      // Reset form fields after successful upload
      setFormData({ name: '', price: '', description: '', category: '', seller: '', stock: '' });
      setImages([]);
    } catch (error) {
      toast.error('Error uploading product!');
      console.error('Upload error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h1>Upload Product</h1>
      <form onSubmit={handleSubmit}>
        {/* Form Fields */}
        {[
          { label: 'Name', name: 'name', type: 'text', value: formData.name },
          { label: 'Price (₹)', name: 'price', type: 'number', value: formData.price, min: '0.01', step: '0.01' },
          { label: 'Description', name: 'description', type: 'textarea', value: formData.description },
          { label: 'Seller', name: 'seller', type: 'text', value: formData.seller },
          { label: 'Stock', name: 'stock', type: 'number', value: formData.stock, min: '1' },
        ].map((field, idx) => (
          <div className="form-group" key={idx}>
            <label>{field.label}</label>
            {field.type === 'textarea' ? (
              <textarea
                className="form-control"
                name={field.name}
                value={field.value}
                onChange={handleInputChange}
                required
              />
            ) : (
              <input
                type={field.type}
                className="form-control"
                name={field.name}
                value={field.value}
                onChange={handleInputChange}
                required
                {...(field.min && { min: field.min })}
                {...(field.step && { step: field.step })}
              />
            )}
          </div>
        ))}

        {/* Category Dropdown */}
        <div className="form-group">
          <label>Category</label>
          <select
            className="form-control"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            required
          >
            <option value="">Select a category</option>
            {['Electronics', 'Footwear','Watch', 'Laptops', 'Mobile Phones', 'Headphones'].map((category, idx) => (
              <option value={category} key={idx}>{category}</option>
            ))}
          </select>
        </div>

        {/* File Input */}
        <div className="form-group">
          <label>Images</label>
          <input
            type="file"
            className="form-control"
            onChange={handleFileChange}
            multiple
            required
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary mt-3" disabled={isLoading}>
          {isLoading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
    </div>
  );
}

export default UploadPage;
