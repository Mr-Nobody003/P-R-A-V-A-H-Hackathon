import React from 'react';

export function Hero() {
  return (
    <div className="relative">
      <div className="absolute inset-0">
        <img
          className="w-full h-full object-cover"
          src="https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
          alt="Traditional weaving"
        />
        <div className="absolute inset-0 bg-gray-900 bg-opacity-60"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Discover Northeast India's
          <span className="block text-amber-400">Artistic Heritage</span>
        </h1>
        <p className="mt-6 max-w-3xl text-xl text-gray-100">
          Explore authentic handcrafted treasures from skilled artisans across Northeast India.
          Each piece tells a story of tradition, culture, and exceptional craftsmanship.
        </p>
        <div className="mt-10">
          <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-amber-700 bg-white hover:bg-amber-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500">
            Explore Collection
          </button>
        </div>
      </div>
    </div>
  );
}