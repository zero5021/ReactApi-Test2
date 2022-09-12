import React, { useState, useEffect } from "react";
import Personaje from "./Personaje";



//paginacion
function NavPage(props) {
  return (
    <div className="page d-flex justify-content-center align-items-center p-2 animate__animated animate__bounce">
      <button
        className="btn btn-info btn-sm border-warning text-warning"
        onClick={() => props.setPageNumber(props.pageNumber - 1)}
      >
        &laquo;&laquo;
      </button>
      <p className="parrafo">Página: {props.pageNumber}</p>
      <button
        className="btn btn-info btn-sm border-warning mx-4"
        onClick={() => props.setPageNumber(props.pageNumber + 1)}
      >
        &raquo;&raquo;
      </button>
    </div>
  );
}

let arrayOrdenar = [];

const MiApi = ({ nombrePersonaje }) => {
  const [personajes, setPersonajes] = useState([]); // array vacio que recibira data
  let [pageNumber, setPageNumber] = useState(1); //paginacion
  const [loading, setLoading] = useState(false); //esto es un spinners que aparece por si la busqueda demora

  useEffect(() => {
    consumirApi(nombrePersonaje);
    
  }, [nombrePersonaje, pageNumber]);


  const consumirApi = async (nombre) => {
    setLoading(true); // empieza con verdadera
    try {
      const res = await fetch(
        `https://rickandmortyapi.com/api/character/?page=${pageNumber}&name=${nombre}&status=alive`
      );

      const datos = await res.json();

      arrayOrdenar = datos.results;

      setPersonajes(datos.results);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // culmina como falso
    }
  };


  function ascendente() {
    arrayOrdenar.sort(function (a, b) {
      if (a.name > b.name) {
        return 1;
      }
      if (a.name < b.name) {
        return -1;
      }
      return 0;
    });
    console.log(arrayOrdenar);
    setPersonajes([...personajes, arrayOrdenar]);

  }

  function descendente() {
    arrayOrdenar.sort(function (a, b) {
      if (a.name > b.name) {
        return -1;
      }
      if (a.name < b.name) {
        return 1;
      }
      return 0;
    });
    console.log(arrayOrdenar);
    setPersonajes([...personajes, arrayOrdenar]);

  }

  return (
    <div>
      {/* ordenar datos*/}
      <div className="card-ordenar mb-3 mt-3 animate__animated animate__fadeInLeft">
      <div className="card-body">
        <h5 className="card-title text-center">Ordenar: </h5>
        <div className="d-flex justify-content-between">
          <button className="btn mx-4" 
          onClick={ascendente}
          >
            Ascendente A-Z
          </button>
          <button
            className="btn"
            onClick={descendente}
          >
            Descendente Z-A
          </button>
        </div>
      </div>
    </div>

    {/* paginacion superior */}
      <NavPage pageNumber={pageNumber} setPageNumber={setPageNumber} />

      {/* condicion para el spinners y card */}
      {loading ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="row mt-2">
          {arrayOrdenar.map((item) => (
            <Personaje key={item.id} personaje={item} />
          ))}
        </div>
      )}

      {/* paginacion inferior */}
      <NavPage pageNumber={pageNumber} setPageNumber={setPageNumber} />
    </div>
  );
};

export default MiApi;
