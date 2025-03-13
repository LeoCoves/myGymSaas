import { useState, useEffect } from "react";

export default function WordRotator() {
  const words = ["Centros de yoga", "Bienestar Comun", "Entrenadores Personales", "Escuela de Artes", "Gimnasios y centros fitness", "Centros Deportivos"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 2000);

    return () => clearInterval(interval); // Limpia el intervalo al desmontar
  }, []);

  return <span>{words[index]}</span>;
}