import ProductCard from "../components/ProductCard";

const Products = () => {
  const products = [
    { id: 1, name: "Silk Scarf", price: 1200, image: "/scarf.jpg" },
    { id: 2, name: "Bamboo Basket", price: 800, image: "/basket.jpg" },
    { id: 3, name: "Terracotta Vase", price: 1500, image: "/vase.jpg" },
  ];

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">All Products</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
