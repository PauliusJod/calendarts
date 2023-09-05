import React, { Component, ReactElement } from "react";
import { Route, Routes } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import { Layout } from "./components/Layout";
import "./custom.css";
import "./App.css";

import "bootstrap/dist/css/bootstrap.css";
function App() {
  return (
    <div style={{ minHeight: "95vh" }}>
      <Layout>
        <Routes>
          {AppRoutes.map((route, index) => {
            const { element, ...rest } = route;
            return <Route key={index} {...rest} element={element} />;
          })}
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
