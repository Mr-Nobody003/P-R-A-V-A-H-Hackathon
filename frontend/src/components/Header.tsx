import React from 'react';
import { ShoppingCart, Search, Menu } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <button className="p-2 rounded-md text-gray-400 lg:hidden">
              <Menu className="h-6 w-6" />
            </button>
            <div className="ml-2 lg:ml-0">
              <h1 className="text-2xl font-bold text-amber-700">NorthEast Crafts</h1>
            </div>
          </div>
          
          <div className="hidden lg:flex flex-1 justify-center px-2">
            <div className="max-w-lg w-full">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-amber-600 focus:border-amber-600 sm:text-sm"
                  placeholder="Search artisans and products..."
                  type="search"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <button className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100">
              <ShoppingCart className="h-6 w-6" />
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}