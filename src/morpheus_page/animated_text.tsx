import  { useState, useEffect } from "react";

export function AnimatedEllipsis() {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : ""));
    }, 500); // Adjust the speed (500ms) as needed
    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  return <span>Pick one{dots}</span>;
}

export default AnimatedEllipsis;
