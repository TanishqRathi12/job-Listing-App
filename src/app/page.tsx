"use client";

import Navigation from "./components/Navigation";
import Filter from "./components/Filter";
import Container from "./components/Container";
import Footer from "./components/Footer";

const jobApp = () => {
  return (
    <div>
      <Navigation />
      <Filter />
      <Container />
      <Footer />
    </div>
  );
};

export default jobApp;
