import { React, useState, useEffect } from "react";

import ListePieces from "../composants/ListePieces";

function PageRepertoire() {
  const [pieces, setListePieces] = useState([]);

  useEffect(() => {
    const chercherDonnees = async () => {
      const resultat = await fetch(`/api/pieces`);
      const body = await resultat.json().catch((error) => {
        console.log(error);
      });
      setListePieces(body);
    };
    chercherDonnees();
  }, []);

  return (
    <>
      <h1>Liste du répertoire</h1>
      <ListePieces pieces={pieces} setListePieces={setListePieces} />
    </>
  );
}

export default PageRepertoire;
