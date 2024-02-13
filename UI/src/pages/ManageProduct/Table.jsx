import { useLoaderData, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { TbHttpDelete } from "react-icons/tb";
import { GrUpdate } from "react-icons/gr";

function Table() {
  const navigate = useNavigate();
  const products = useLoaderData();
  function handleDelete(id) {
    fetch(`http://localhost:3000/delete/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          navigate("/manage-product");
        }
      });
  }
  return (
    <>
      <div className="my-auto mx-auto md:mx-40 lg:mx-96">
        <h1 className="text-center text-4xl font-semibold text-white pb-4">
          Manage your Product
        </h1>
        <table className="table table-dark">
          <thead>
            <tr className="border-[#000000]">
              <th className="text-center font-bold text-lg">Name</th>
              <th className="text-center font-bold text-lg">Genre</th>
              <th className="text-center font-bold text-lg">Date</th>
              <th className="text-center font-bold text-lg">Platform</th>
              <th className="text-center font-bold text-lg">Price</th>
              <th className="text-center font-bold text-lg">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product) => (
              <tr className="hover" key={product._id}>
                <td className="text-center text-lg border-[#000000]">
                  {product.name}
                </td>
                <td className="text-center text-lg border-[#000000]">
                  {product.genre}
                </td>
                <td className="text-center text-lg border-[#000000]">
                  {product.date}
                </td>
                <td className="text-center text-lg border-[#000000]">
                  {product.platform}
                </td>
                <td className="text-center text-lg border-[#000000]">
                  {product.price}
                </td>
                <td className="text-center text-lg border-[#000000]">
                  <Link to={`/product/${product?._id}`}>
                    <button className="btn btn-sm md:btn-md lg:btn-lg btn-accent mx-1">
                      {" "}
                      <FaEye></FaEye>{" "}
                    </button>
                  </Link>
                  <button
                    className="btn btn-sm md:btn-md lg:btn-lg btn-warning  mx-1"
                    onClick={() => handleDelete(product?._id)}
                  >
                    {" "}
                    <TbHttpDelete></TbHttpDelete>{" "}
                  </button>
                  <Link to={`/update/${product?._id}`}>
                    <button className="btn btn-sm md:btn-md lg:btn-lg btn-primary mx-1">
                      {" "}
                      <GrUpdate></GrUpdate>{" "}
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Table;
