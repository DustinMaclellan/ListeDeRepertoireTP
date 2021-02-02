import { React, useState, useEffect } from "react";

import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import ListePieces from "../composants/ListePieces";

function PageAdmin() {
  const [listePieces, setListePieces] = useState([]);
  const [demandePieces, setDemandesPieces] = useState(false);

  useEffect(() => {
    const chercherDonnees = async () => {
      const resultat = await fetch(`/api/pieces`);
      const body = await resultat.json().catch((error) => {
        console.log(error);
      });
      setListePieces(body);
    };
    chercherDonnees();
  }, [demandePieces]);

  return (
    <>
      <h1>Page administrateur</h1>

      <Link to="/ajouter">
        <Button>Ajouter une nouvelle pièce</Button>
      </Link>

      <h2>Liste du répertoire</h2>
      <ListePieces
        pieces={listePieces}
        setListePieces={setListePieces}
        demandePieces={demandePieces}
        setDemandePieces={setDemandesPieces}
        versionAdmin={true}
      />

      <br />
      <Link to="/liste-demandes">
        <Button>Voir les demandes spéciales</Button>
      </Link>
    </>
  );
}

export default PageAdmin;
