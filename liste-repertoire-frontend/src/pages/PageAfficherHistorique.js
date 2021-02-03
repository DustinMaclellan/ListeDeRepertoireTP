import { React, useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Alert from "react-bootstrap/Alert";

function AfficherHistorique() {
  const nom = sessionStorage.getItem("user");
  const [listeDemandes, setListeDemandes] = useState([
    { _id: "", nomClient: "", pieces: [], dateAjout: "", actif: 1 },
  ]);
  const [affichage, setAffichage] = useState(true);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const chercherDemandes = async () => {
      const resultat = await fetch(`/api/demandes/${nom}`);
      const body = await resultat.json().catch((error) => {
        console.log(error);
      });
      if (body.length === 0) {
        setAffichage(false);
      } else {
        setListeDemandes(body);
      }
    };
    chercherDemandes();
  }, []);

  function demandeVideMessage() {
    return (
      <>
        <div>
          <Alert variant="danger">
            Vous n'avez pas de liste de demandes présentement!
          </Alert>
        </div>
      </>
    );
  }

  return (
    <>
      <h1>Mes demandes spéciales</h1>
      <br />
      <ListGroup>
        <ListGroup.Item className={affichage === false ? "d-block" : "d-none"}>
          {demandeVideMessage()}
        </ListGroup.Item>
      </ListGroup>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Date de liste</th>
            <th>Voir la liste</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(listeDemandes).map((keys) => (
            <tr>
              <td>{listeDemandes[keys].dateAjout}</td>
              <td>
                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                  <Link to={`/AffichageListe/${listeDemandes[keys]._id}`}>
                    <Button variant="primary" class="btn btn-primary btn-lg">
                      Afficher liste
                    </Button>
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <br />
      <div class="d-grid gap-2 d-md-flex justify-content-md-end">
        <Link to="/demande-speciale">
          <Button variant="success">Ajouter une liste</Button>
        </Link>
      </div>
    </>
  );
}

export default AfficherHistorique;
