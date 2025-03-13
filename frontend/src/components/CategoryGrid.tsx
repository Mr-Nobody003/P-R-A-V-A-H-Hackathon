import React from 'react';

const categories = [
  {
    name: 'Traditional Weaving',
    image: 'https://images.unsplash.com/photo-1589952283406-b53a7d1347e8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'Exquisite silk weaving including Muga, Pat, and Eri varieties'
  },
  {
    name: 'Bamboo & Cane Crafts',
    image: 'https://images.unsplash.com/photo-1602067340370-bdcebe8d1930?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'Sustainable crafts transformed into beautiful home décor'
  },
  {
    name: 'Pottery & Terracotta',
    image: 'https://images.unsplash.com/photo-1565193298433-f9a1960084c8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'Traditional pottery from villages like Asharikandi'
  },
  {
    name: 'Wood Carving',
    image: 'https://images.unsplash.com/photo-1611486212557-88be5ff6f941?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'Intricate wooden artifacts showcasing cultural heritage'
  }
];

export function CategoryGrid() {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Explore Our Categories
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Discover the diverse craftsmanship of Northeast India
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <div key={category.name} className="group relative">
              <div className="relative w-full h-80 rounded-lg overflow-hidden group-hover:opacity-75 transition-opacity duration-300">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-center object-cover"
                />
              </div>
              <h3 className="mt-6 text-lg font-medium text-gray-900">
                {category.name}
              </h3>
              <p className="text-sm text-gray-500">{category.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}