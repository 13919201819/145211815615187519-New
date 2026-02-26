// import { createContext, useContext, useState, useEffect } from "react";

// const LoaderContext = createContext();

// export const useLoader = () => {
//   const context = useContext(LoaderContext);
//   if (!context) {
//     throw new Error("useLoader must be used within LoaderProvider");
//   }
//   return context;
// };

// export const LoaderProvider = ({ children }) => {
//   const [isLoading, setIsLoading] = useState(true); // Start with true for initial page load

//   // Hide loader after initial page load
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsLoading(false);
//     }, 1000); // Adjust this time as needed

//     return () => clearTimeout(timer);
//   }, []);

//   const showLoader = () => setIsLoading(true);
//   const hideLoader = () => setIsLoading(false);

//   return (
//     <LoaderContext.Provider value={{ isLoading, showLoader, hideLoader }}>
//       {children}
//     </LoaderContext.Provider>
//   );
// };






import { createContext, useContext, useState } from "react";

const LoaderContext = createContext();

export const useLoader = () => {
  const context = useContext(LoaderContext);
  if (!context) {
    throw new Error("useLoader must be used within LoaderProvider");
  }
  return context;
};

export const LoaderProvider = ({ children }) => {
  const [loadingCount, setLoadingCount] = useState(0);

  const showLoader = () => {
    setLoadingCount((prev) => prev + 1);
  };

  const hideLoader = () => {
    setLoadingCount((prev) => Math.max(0, prev - 1));
  };

  const isLoading = loadingCount > 0;

  return (
    <LoaderContext.Provider value={{ isLoading, showLoader, hideLoader }}>
      {children}
    </LoaderContext.Provider>
  );
};