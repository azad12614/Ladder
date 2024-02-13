import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import Table from "./Table";

function ManageProduct() {
  return (
    <>
      <div className="d-flex flex-column max-w-full vh-100 overflow-x-hidden bg-[#31304D]">
        <Navbar></Navbar>
        <Table></Table>
        <div className="mt-auto mb-0">
          <Footer></Footer>
        </div>
      </div>
    </>
  );
}

export default ManageProduct;
