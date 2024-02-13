import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { useLoaderData } from "react-router-dom";

function ProductDetails() {
  const product = useLoaderData();
  const pic = product?.image;
  return (
    <div className="d-flex flex-column max-w-full vh-100 overflow-x-hidden bg-[#31304D]">
      <Navbar></Navbar>
      <h1 className="text-center text-4xl font-semibold text-white my-4">
        Product Details
      </h1>
      <div className="card card-side bg-transparent m-auto max-w-7xl border-0">
        <figure className="w-80 h-80 my-auto">
          <img
            className="rounded-full z-[1] w-80 h-80 object-cover"
            src={`${pic}`}
            alt="product"
          />
        </figure>
        <div className="card-body w-min h-max bg-[#161A30] -ml-36 rounded-xl">
          <h className="card-title justify-center text-[#fed7aa] text-bold text-5xl ml-32 -mt-3">
            {product.name}
          </h>
          <div className="flex justify-center ml-32 ">
            <h className="card-title text-[#FFFFFF] text-semibold text-2xl mr-5 -mt-3">
              {product.genre}
            </h>
            <h className="card-title text-[#fed7aa] text-semibold text-2xl ml-5 -mt-3">
              {product.platform}
            </h>
          </div>
          <h className="justify-center card-title bg-[#FFFFFF] rounded-3xl text-[#31304D] text-bold text-xl ml-32">
            {product.date}
          </h>
          <div className="justify-center card-actions ml-32">
            <div className="text-center text-[#fed7aa] text-bold text-xl rounded-lg border-0">
              Price: ${product.price}
            </div>
          </div>
          <p className="text-[#FFFFFF] ml-32">{product.description}...</p>
        </div>
      </div>
      <div className="mt-auto mb-0">
        <Footer></Footer>
      </div>
    </div>
  );
}

export default ProductDetails;
