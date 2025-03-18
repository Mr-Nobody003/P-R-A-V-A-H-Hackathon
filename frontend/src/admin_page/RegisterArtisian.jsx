import { useState } from "react";
import { useNavigate } from "react-router-dom";
const ArtisanRegistration = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("personal");
  const [formData, setFormData] = useState({
    personal: { 
      name: "", email: "", phone: "", address: "",
      image: "", craft: "", location: "", description: ""
    },
    bank: { accountName: "", accountNumber: "", bankName: "" },
    account: { username: "", password: "", confirmPassword: "" },
  });
  

  const handleChange = (section, field, value) => {
    setFormData({ ...formData, [section]: { ...formData[section], [field]: value } });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.account.password !== formData.account.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("http://localhost:5555/api/admin/artisan/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          personalInfo: formData.personal,
          bankInfo: formData.bank,
          credentials: {
            username: formData.account.username,
            password: formData.account.password,
          },
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Registration Successful");
        console.log(data);
        // ✅ Redirect to the profile page (you can pass artisanId if needed)
        navigate(`/artisan/profile/${data.artisanId}`);
      } else {
        alert(data.error || "Registration Failed");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Something went wrong");
    }
    console.log({
      personalInfo: formData.personal,
      bankInfo: formData.bank,
      credentials: {
        username: formData.account.username,
        password: formData.account.password,
      },
    });
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Artisan Registration</h1>
      <p className="text-gray-600 mb-6">Join our platform to showcase your crafts and receive payments directly.</p>

      {/* Tabs Navigation */}
      <div className="flex border-b">
        {["personal", "bank", "account"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-2 px-4 border-b-2 ${activeTab === tab ? "border-blue-500 font-semibold" : "border-transparent text-gray-500"}`}
          >
            {tab === "personal" ? "Personal Info" : tab === "bank" ? "Bank Details" : "Account Setup"}
          </button>
        ))}
      </div>

      {/* Form Sections */}
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md mt-4 rounded-md">
        {activeTab === "personal" && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium">Full Name</label>
                <input
                  type="text"
                  value={formData.personal.name}
                  onChange={(e) => handleChange("personal", "name", e.target.value)}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              <div>
                <label className="block font-medium">Email</label>
                <input
                  type="email"
                  value={formData.personal.email}
                  onChange={(e) => handleChange("personal", "email", e.target.value)}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block font-medium">Phone</label>
              <input
                type="text"
                value={formData.personal.phone}
                onChange={(e) => handleChange("personal", "phone", e.target.value)}
                className="w-full border p-2 rounded"
                required
              />
            </div>

            <div className="mt-4">
              <label className="block font-medium">Address</label>
              <textarea
                value={formData.personal.address}
                onChange={(e) => handleChange("personal", "address", e.target.value)}
                className="w-full border p-2 rounded"
                required
              />
            </div>
            <div className="mt-4">
              <label className="block font-medium">Craft Type</label>
              <input
                type="text"
                value={formData.personal.craft}
                onChange={(e) => handleChange("personal", "craft", e.target.value)}
                className="w-full border p-2 rounded"
                placeholder="Eg: Bamboo Craft, Weaving, etc."
                required
              />
            </div>

            <div className="mt-4">
              <label className="block font-medium">Location</label>
              <input
                type="text"
                value={formData.personal.location}
                onChange={(e) => handleChange("personal", "location", e.target.value)}
                className="w-full border p-2 rounded"
                placeholder="City/Village, State"
                required
              />
            </div>

            <div className="mt-4">
              <label className="block font-medium">Description of Craft</label>
              <textarea
                value={formData.personal.description}
                onChange={(e) => handleChange("personal", "description", e.target.value)}
                className="w-full border p-2 rounded"
                placeholder="Describe your craft or art"
                required
              />
            </div>
            <div className="mt-4">
              <label className="block font-medium">Profile Image URL</label>
              <input
                type="text"
                value={formData.personal.image}
                onChange={(e) => handleChange("personal", "image", e.target.value)}
                className="w-full border p-2 rounded"
                placeholder="Paste image URL here"
                required
              />
            </div>

            <div className="mt-6 text-right">
              <button type="button" onClick={() => setActiveTab("bank")} className="bg-blue-600 text-white px-4 py-2 rounded">
                Next: Bank Details
              </button>
            </div>
          </>
        )}

        {activeTab === "bank" && (
          <>
            <div className="mt-4">
              <label className="block font-medium">Account Holder Name</label>
              <input
                type="text"
                value={formData.bank.accountName}
                onChange={(e) => handleChange("bank", "accountName", e.target.value)}
                className="w-full border p-2 rounded"
                required
              />
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium">Account Number</label>
                <input
                  type="text"
                  value={formData.bank.accountNumber}
                  onChange={(e) => handleChange("bank", "accountNumber", e.target.value)}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              <div>
                <label className="block font-medium">Bank Name</label>
                <input
                  type="text"
                  value={formData.bank.bankName}
                  onChange={(e) => handleChange("bank", "bankName", e.target.value)}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
            </div>

            <div className="mt-6 flex justify-between">
              <button type="button" onClick={() => setActiveTab("personal")} className="bg-gray-500 text-white px-4 py-2 rounded">
                Back
              </button>
              <button type="button" onClick={() => setActiveTab("account")} className="bg-blue-600 text-white px-4 py-2 rounded">
                Next: Account Setup
              </button>
            </div>
          </>
        )}

        {activeTab === "account" && (
          <>
            <div className="mt-4">
              <label className="block font-medium">Username</label>
              <input
                type="text"
                value={formData.account.username}
                onChange={(e) => handleChange("account", "username", e.target.value)}
                className="w-full border p-2 rounded"
                required
              />
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium">Password</label>
                <input
                  type="password"
                  value={formData.account.password}
                  onChange={(e) => handleChange("account", "password", e.target.value)}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              <div>
                <label className="block font-medium">Confirm Password</label>
                <input
                  type="password"
                  value={formData.account.confirmPassword}
                  onChange={(e) => handleChange("account", "confirmPassword", e.target.value)}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
            </div>

            <div className="mt-6 flex justify-between">
              <button type="button" onClick={() => setActiveTab("bank")} className="bg-gray-500 text-white px-4 py-2 rounded">
                Back
              </button>
              <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
                Submit Registration
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};


export default ArtisanRegistration;
