import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="border rounded-lg p-4 shadow">
      <img src={product.image} alt={product.name} className="w-full h-40 object-cover" />
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p className="text-blue-600 font-bold">₹{product.price}</p>
      {/* Fix the Link to use product._id */}
      <Link to={`/products/${product._id}`} className="text-white bg-blue-600 px-3 py-1 rounded mt-2 inline-block">
  View Details
</Link>


    </div>
  );
};

export default ProductCard;

