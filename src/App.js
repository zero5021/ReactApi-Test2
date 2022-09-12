import MiApi from "./components/MiApi";
//imagen
import imagen from "./assets/img/imagen.png";
//hooks
import { useFormulario } from "./hooks/useFormulario";
import React, { useState } from "react";


function App() {
  const [nombrePersonaje, setNombrePersonaje] = useState("");

  const [inputs, handleChange, reset] = useFormulario({
    nombre: ""
  });

  const { nombre} = inputs;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(nombre);

    setNombrePersonaje(nombre.trim().toLowerCase());
    reset();
  };
  
  return (
    <div className="container-fluid">

      {/* //encabezado */}
      <header className="banner animate__animated animate__rubberBand">
        <img className="img-banner" src={imagen} alt="banner-rick-morty" />
      </header>

      {/* //principal */}
      <main>
        <form onSubmit={handleSubmit} className='formulario animate__animated animate__fadeInRight'>
          <input
            type="text"
            placeholder="Ingrese personaje"
            className="form-control mb-3"
            name="nombre"
            value={nombre}
            onChange={handleChange}
          />

          <button
            className="btn border-warning mb-3"
            type="submit"
          >
            Buscar
          </button>

        </form>
      </main> 

      {/* apis */}
      <MiApi nombrePersonaje={nombrePersonaje} />

        {/* //pie de pagina */}
      <footer className="footer animate__animated animate__rubberBand">
        <img className="img-footer mb-2" src={imagen} alt="" />
      </footer>

    </div>
  );
}

export default App;
