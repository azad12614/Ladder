import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import RProblem from "../../components/RProblem";

function ViewProduct({ Handle, sendValue }) {

  var table = [``, ``, ``, ``, ``, ``, ``];

  function formHandle(event) {
    event.preventDefault();
    Handle = event.target.Handle.value;
    // console.log(Handle);
    sendValue(Handle);
    
  }

  function Ratings(Rating) {
    let i = (Rating - 800) / 100;
    table[i] = <RProblem propsValue={[Handle, Rating]}></RProblem>
    // console.log(i);
  }

  return (
    <div className="d-flex flex-column max-w-full vh-100 overflow-x-hidden bg-[#31304D]">
      <Navbar></Navbar>
      <form
        method="POST"
        onSubmit={formHandle}
        className="text-center text-4xl font-semibold text-white mt-16 mb-4"
      >
        <input
          type="text"
          name="Handle"
          id="Handle"
          className="text-xl text-center text-md w-60 bg-transparent border-b-2 border-[#B6BBC4] rounded-3xl appearance-none focus:border-[#B6BBC4] focus:outline-none focus:ring-0 peer"
          placeholder={`${Handle}`}
          required="y"
        />
      </form>
      <div role="tablist" className="tabs tabs-lifted">
        <input type="radio" name="my_tabs_2" role="tab" className="tab text-white" onClick={Ratings(800)} aria-label="800" />
        <div role="tabpanel" id="800" className="tab-content bg-base-100 text-white border-base-300 rounded-box p-6">
          {/*<RProblem propsValue={[Handle, 800]}></RProblem>*/}
          {Ratings(800)}
          {table[0]}
        </div>

        <input type="radio" name="my_tabs_2" role="tab" className="tab text-white" onClick={Ratings(900)} aria-label="900" />
        <div role="tabpanel" id="900" className="tab-content bg-base-100 text-white border-base-300 rounded-box p-6">
          {/*<RProblem propsValue={[Handle, 900]}></RProblem>*/}
          {/* {Ratings(900)} */}
          {table[1]}
        </div>

        <input type="radio" name="my_tabs_2" role="tab" className="tab text-white" onClick={Ratings(1000)} aria-label="1000" />
        <div role="tabpanel" id="1000" className="tab-content bg-base-100 text-white border-base-300 rounded-box p-6">
          {/*<RProblem propsValue={[Handle, 1000]}></RProblem>*/}
          {Ratings(1000)}
          {table[2]}
        </div>

        <input type="radio" name="my_tabs_2" role="tab" className="tab text-white" onClick={Ratings(1100)} aria-label="1100" />
        <div role="tabpanel" id="1100" className="tab-content bg-base-100 text-white border-base-300 rounded-box p-6">
          {/*<RProblem propsValue={[Handle, 1100]}></RProblem>*/}
          {Ratings(1100)}
          {table[3]}
        </div>

        <input type="radio" name="my_tabs_2" role="tab" className="tab text-white" onClick={Ratings(1200)} aria-label="1200" />
        <div role="tabpanel" id="1200" className="tab-content bg-base-100 text-white border-base-300 rounded-box p-6">
          {/*<RProblem propsValue={[Handle, 1200]}></RProblem>*/}
          {Ratings(1200)}
          {table[4]}
        </div>

        <input type="radio" name="my_tabs_2" role="tab" className="tab text-white" onClick={Ratings(1300)} aria-label="1300" />
        <div role="tabpanel" id="1300" className="tab-content bg-base-100 text-white border-base-300 rounded-box p-6">
          {/*<RProblem propsValue={[Handle, 1300]}></RProblem>*/}
          {Ratings(1300)}
          {table[5]}
        </div>

        <input type="radio" name="my_tabs_2" role="tab" className="tab text-white" onClick={Ratings(1400)} aria-label="1400" />
        <div role="tabpanel" id="1400" className="tab-content bg-base-100 text-white border-base-300 rounded-box p-6">
          {/*<RProblem propsValue={[Handle, 1400]}></RProblem>*/}
          {/* {Ratings(1400)} */}
          {table[6]}
        </div>
      </div>
      <div className="mt-auto mb-0">
        <Footer></Footer>
      </div>
    </div>
  );
}

export default ViewProduct;
