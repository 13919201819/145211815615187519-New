import { useEffect } from "react";
import { useLoader } from "../context/LoaderContext";

// Hook to handle initial page load
export const usePageLoader = () => {
  const { showLoader, hideLoader } = useLoader();

  useEffect(() => {
    // Show loader initially
    showLoader();

    // Hide when window finishes loading (all resources loaded)
    const handleLoad = () => {
      hideLoader();
    };

    // If already loaded
    if (document.readyState === "complete") {
      hideLoader();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => {
      window.removeEventListener("load", handleLoad);
      hideLoader();
    };
  }, [showLoader, hideLoader]);
};

// Hook for image loading
export const useImageLoader = (imageUrls = []) => {
  const { showLoader, hideLoader } = useLoader();

  useEffect(() => {
    if (imageUrls.length === 0) return;

    showLoader();
    let loadedCount = 0;

    const promises = imageUrls.map((url) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          loadedCount++;
          if (loadedCount === imageUrls.length) {
            hideLoader();
          }
          resolve();
        };
        img.onerror = () => {
          loadedCount++;
          if (loadedCount === imageUrls.length) {
            hideLoader();
          }
          resolve();
        };
        img.src = url;
      });
    });

    Promise.all(promises);

    return () => hideLoader();
  }, [imageUrls.join(","), showLoader, hideLoader]);
};