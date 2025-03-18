import CategoryShowcase from "../components/CategoryShowcase";

const CategoriesPage = () => {
  return (
    <div className="min-h-screen py-12 px-4 md:px-6 lg:px-8 bg-amber-50">
      <div className="container mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Explore Craft Categories</h2>
        <CategoryShowcase />
      </div>
    </div>
  );
};

export default CategoriesPage;
