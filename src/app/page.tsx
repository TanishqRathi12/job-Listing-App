"use client";

import { QueryClient, QueryClientProvider, } from "@tanstack/react-query";
//import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Container from "./components/Container/Container";
import Footer from "./components/Shared/Footer";
import Navigation from "./components/Navigation/Navigation";



const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
     // cacheTime: 1000 * 60 * 30,
      refetchOnWindowFocus: false,
    },
  },
});
const jobApp = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer />
      <Navigation />
      <Container  />
      <Footer />
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
};

export default jobApp;
