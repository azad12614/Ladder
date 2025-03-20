import { useNavigate } from "react-router-dom";
import "./Form.css";

function Form({ URL }) {
  const navigate = useNavigate();

  function formHandle(event) {
    event.preventDefault();
    const Rating = event.target.Rating.value;
    const Link = event.target.Link.value;
    const Name = event.target.Name.value;
    const Tags = event.target.Tags.value;
    const Level = event.target.Level.value;
    const Knowledge = event.target.Knowledge.value;
    const problem = {
      Rating,
      Link,
      Name,
      Tags,
      Level,
      Knowledge,
    };
    fetch(`${URL}/add-${Rating}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(problem),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
          navigate("/");
        }
      });
  }

  return (
    <div className="form-container">
      <h2>Add Problem</h2>
      <form onSubmit={formHandle}>
        <div className="form-group">
          <input
            type="text"
            name="Rating"
            id="Rating"
            placeholder=" "
            required
          />
          <label htmlFor="Rating">Rating</label>
        </div>
        <div className="form-group">
          <input type="text" name="Link" id="Link" placeholder=" " required />
          <label htmlFor="Link">Link</label>
        </div>
        <div className="form-group">
          <input type="text" name="Name" id="Name" placeholder=" " required />
          <label htmlFor="Name">Name</label>
        </div>
        <div className="form-group">
          <input type="text" name="Tags" id="Tags" placeholder=" " />
          <label htmlFor="Tags">Tags</label>
        </div>
        <div className="form-group">
          <input type="text" name="Level" id="Level" placeholder=" " />
          <label htmlFor="Level">Difficulty Level</label>
        </div>
        <div className="form-group">
          <input type="text" name="Knowledge" id="Knowledge" placeholder=" " />
          <label htmlFor="Knowledge">Required Knowledge</label>
        </div>
        <button type="submit" className="submitButton">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Form;
