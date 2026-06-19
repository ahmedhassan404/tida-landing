import { useState } from "react";

export default function Image({ className = "", onLoad, ...props }) {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoad = (e) => {
    setIsLoaded(true);
    if (onLoad) {
      onLoad(e);
    }
  };

  return (
    <img
      className={`${className} ${isLoaded ? "img-loaded" : "img-loading"}`}
      onLoad={handleLoad}
      {...props}
    />
  );
}
