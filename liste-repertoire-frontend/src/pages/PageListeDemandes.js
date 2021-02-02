import { React, useState, useEffect } from "react";

import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

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
      <h1>Demandes spéciales</h1>
      <ListGroup>
        {Object.keys(listeDemandes).map((keys) => (
          <ListGroup.Item
            className={listeDemandes[keys].actif === 1 ? "d-block" : "d-none"}
          >
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Nom Client</th>
                  <th>Pieces</th>
                  <th>Modifier Etat</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <h4>{listeDemandes[keys].nomClient}</h4>
                  </td>
                  <td>
                    {Object.keys(listeDemandes[keys].pieces).map((chanson) => (
                      <ul>
                        <li>
                          <b>Titre:</b>{" "}
                          {listeDemandes[keys].pieces[chanson].titre}
                        </li>
                        <li>
                          <b>Artiste: </b>
                          {listeDemandes[keys].pieces[chanson].artiste}
                        </li>
                        <li>
                          <b>Categories:</b>{" "}
                        </li>
                        <ol>
                          {listeDemandes[keys].pieces[chanson].categories.map(
                            (element) => (
                              <li>{element}</li>
                            )
                          )}
                        </ol>
                      </ul>
                    ))}
                  </td>
                  <td>
                    {" "}
                    {listeDemandes[keys].actif === 1 ? (
                      <Button
                        variant="warning"
                        onClick={() => handleClick(listeDemandes[keys]._id)}
                      >
                        Rendre inactive
                      </Button>
                    ) : (
                      <h4>Demande inactive</h4>
                    )}
                  </td>
                </tr>
              </tbody>
            </Table>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
}

export default PageListeDemandes;
