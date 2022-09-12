import React from "react";


const Personaje = ({ personaje }) => {
  const { name, species, image, location } = personaje;

  return (
    <>
      <div className="col col-md-2 col-lg-3 mb-3 d-flex justify-content-center">
        <div className="card animate__animated animate__fadeInUp">
          <div className="overflow">
              <img src={image} alt={`imagen-${name}`} className="img-fluid rounded-pill" />
          </div>
          
          <div className="card-body">
            <h5>{`Nombre: ${name}`}</h5>
            <p>{`Especie: ${species}`}</p>
            <p>{`Ubicación: ${location.name}`}</p>
            
          </div>
        </div>
      </div>
      
    </>
  );
};

export default Personaje;
