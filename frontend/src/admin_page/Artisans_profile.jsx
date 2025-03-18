import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ArtisanProfile = ({ artisanId }) => {
  const [profile, setProfile] = useState(null);
  const [newProductId, setNewProductId] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch Artisan Full Profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`http://localhost:5555/api/profile/${artisanId}`);
        setProfile(res.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [artisanId]);
  
  // Add product to Artisan
  const handleAddProduct = async () => {
    try {
      await axios.post(`http://localhost:5555/api/profile/${artisanId}/add-product`, {
        productId: newProductId,
      });
      alert('Product added successfully!');
      setNewProductId('');
      // Re-fetch profile to update product list
      const res = await axios.get(`http://localhost:5555/api/profile/${artisanId}`);
      setProfile(res.data);
    } catch (err) {
      console.error('Error adding product:', err);
      alert('Failed to add product');
    }
  };

  if (loading) return <p>Loading profile...</p>;

  if (!profile) return <p>Profile not found</p>;

  const { artisan, personal } = profile;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">{artisan.name}'s Profile</h2>

      {/* Artisan Basic Info */}
      <div className="bg-white shadow p-4 rounded mb-6">
        <img src={artisan.image} alt={artisan.name} className="w-48 h-48 object-cover rounded mb-4" />
        <p><strong>Craft:</strong> {artisan.craft}</p>
        <p><strong>Location:</strong> {artisan.location}</p>
        <p><strong>Description:</strong> {artisan.description}</p>
      </div>

      {/* Artisan Personal Info */}
      <div className="bg-white shadow p-4 rounded mb-6">
        <h3 className="text-xl font-semibold mb-3">Personal Details</h3>
        <p><strong>Email:</strong> {personal.email}</p>
        <p><strong>Phone:</strong> {personal.phone}</p>
        <p><strong>Address:</strong> {personal.address}, {personal.city}, {personal.state} - {personal.pincode}</p>
        <p><strong>Experience:</strong> {personal.experience}</p>
        <p><strong>Bio:</strong> {personal.bio}</p>
      </div>

      {/* Bank Details */}
      <div className="bg-white shadow p-4 rounded mb-6">
        <h3 className="text-xl font-semibold mb-3">Bank Details</h3>
        <p><strong>Account Name:</strong> {personal.bankDetails.accountName}</p>
        <p><strong>Account Number:</strong> {personal.bankDetails.accountNumber}</p>
        <p><strong>Bank:</strong> {personal.bankDetails.bankName} ({personal.bankDetails.branch})</p>
        <p><strong>IFSC:</strong> {personal.bankDetails.ifscCode}</p>
        <p><strong>UPI ID:</strong> {personal.bankDetails.upiId}</p>
      </div>

      {/* Products */}
      <div className="bg-white shadow p-4 rounded mb-6">
        <h3 className="text-xl font-semibold mb-3">Products</h3>
        {artisan.products.length > 0 ? (
          artisan.products.map((product) => (
            <p key={product._id}>Product ID: {product._id}</p> // Replace with product.name if populated
          ))
        ) : (
          <p>No products added yet.</p>
        )}
      </div>

      {/* Add Product */}
      <div className="bg-white shadow p-4 rounded mb-6">
        <h3 className="text-xl font-semibold mb-3">Add Product</h3>
        <input
          type="text"
          placeholder="Enter Product ID"
          value={newProductId}
          onChange={(e) => setNewProductId(e.target.value)}
          className="border p-2 mr-4 rounded"
        />
        <button
          onClick={handleAddProduct}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Product
        </button>
      </div>
    </div>
  );
};

export default ArtisanProfile;
