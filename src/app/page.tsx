"use client";

import { QueryClient ,QueryClientProvider } from "@tanstack/react-query";;
import Navigation from "./components/Navigation";
import Filter from "./components/Filter";
import Container from "./components/Container";
import Footer from "./components/Footer";


const queryClient = new QueryClient();
const jobApp = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Navigation />
      <Filter />
      <Container />
      <Footer />
    </QueryClientProvider>
  );
};

export default jobApp;
