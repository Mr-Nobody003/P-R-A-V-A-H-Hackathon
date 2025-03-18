import React from "react";

const ArtisansProfile = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Banner Section */}
      <div className="bg-amber-600 text-white text-center py-12 mb-8">
        <h1 className="text-4xl font-bold mb-2">Hi, Artisan!</h1>
        <p className="text-lg">Welcome to the onboarding page.</p>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4">
        <div className="bg-white p-8 shadow-md rounded-md text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Set up your page</h2>
          <p className="text-gray-600 mb-6">List your products and manage them easily.</p>

          {/* Instructions */}
          <div className="text-left space-y-4">
            <p className="text-gray-700">
              ✅ <strong>Set up your page:</strong> Customize your profile with details and images.
            </p>
            <p className="text-gray-700">
              ✅ <strong>List your products:</strong> Add and showcase your craft items.
            </p>
            <p className="text-gray-700">
              ✅ <strong>Sell and manage:</strong> Track your orders and manage sales effortlessly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtisansProfile;
