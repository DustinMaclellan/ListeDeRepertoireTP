import { React, useState, useEffect } from "react";

import ListeDemandesSpeciales from "../composants/ListeDemandesSpeciales";

function PageListeDemandes() {
  const [listeDemandes, setListeDemandes] = useState({});
  const [verification, setVerification] = useState(false);

  useEffect(() => {
    const chercherDonnees = async () => {
      const resultat = await fetch(`/api/demandes`);
      const body = await resultat.json().catch((error) => {
        console.log(error);
      });
      setListeDemandes(body);
    };
    chercherDonnees();
  }, [verification]);

  const ChangementEtat = async (id) => {
    await fetch(`/api/demandes/inactive/${id}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  function handleClick(id) {
    ChangementEtat(id);
    setVerification(!verification);
  }

  return (
    <>
      <ListeDemandesSpeciales
        listeDemandes={listeDemandes}
        setListeDemandes = {setListeDemandes}
        handleClick={handleClick}
      />
    </>
  );
}

export default PageListeDemandes;
