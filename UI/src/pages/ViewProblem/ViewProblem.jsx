import React, { useState, useEffect } from "react";
import ProblemList from "../../components/ProblemList";
import "./ViewProblem.css";

function ViewProblem({ Handle: initialHandle, sendValue }) {
  const [handle, setHandle] = useState(initialHandle || "");
  const [activeTab, setActiveTab] = useState(800);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newHandle = event.target.Handle.value;
    setHandle(newHandle);
    sendValue(newHandle);
  };

  const handleTabClick = (rating) => {
    setActiveTab(rating);
  };

  const renderTabContent = (rating) => (
    <div
      role="tabpanel"
      id={rating.toString()}
      className={`tab-content ${activeTab === rating ? "active" : ""}`}
    >
      <ProblemList propsValue={[handle, rating]} />
    </div>
  );

  useEffect(() => {
    if (handle) {
      {
        renderTabContent(800);
      }
      {
        renderTabContent(900);
      }
      {
        renderTabContent(1000);
      }
      {
        renderTabContent(1100);
      }
      {
        renderTabContent(1200);
      }
      {
        renderTabContent(1300);
      }
      {
        renderTabContent(1400);
      }
    }
  }, [handle]);

  return (
    <div className="view-problem-container">
      <form onSubmit={handleSubmit} className="handle-form">
        <input
          type="text"
          name="Handle"
          id="Handle"
          className="handle-input"
          placeholder={handle || "Enter CF Handle (Work in Progress)"}
          value={handle}
          onChange={(e) => setHandle(e.target.value)}
          required
        />
        <button type="submit" className="handle-button">
          Submit
        </button>
      </form>
      <div role="tablist" className="tabs-container">
        {[800, 900, 1000, 1100, 1200, 1300, 1400].map((rating) => (
          <button
            key={rating}
            role="tab"
            className={`tab ${activeTab === rating ? "active" : ""}`}
            onClick={() => handleTabClick(rating)}
            aria-label={rating.toString()}
          >
            {rating}
          </button>
        ))}
      </div>
      <div className="tab-contents">
        {renderTabContent(800)}
        {renderTabContent(900)}
        {renderTabContent(1000)}
        {renderTabContent(1100)}
        {renderTabContent(1200)}
        {renderTabContent(1300)}
        {renderTabContent(1400)}
      </div>
    </div>
  );
}

export default ViewProblem;
