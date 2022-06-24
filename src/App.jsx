import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ActivityFeed from "./component/ActivityFeed";
import ActivityDetail from "./component/ActivityDetail";

import Header from "./Header.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <div className="container">
        <Header />
        <div className="container-view">
          <Routes>
            <Route exact path="/" element={<ActivityFeed />} />
            <Route path="/:id" element={<ActivityDetail />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
