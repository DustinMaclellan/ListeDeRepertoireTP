import { React, useState, useEffect } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

function AfficherHistorique() {

    const nom = sessionStorage.getItem('user');
    const [listeDemandes, setListeDemandes] = useState({ _id: "", nomClient: "", pieces: [] });
    const [verification, setVerification] = useState(false);
    const [affichage, setAffichage] = useState(true);

    useEffect(() => {
        const chercherDemandes = async () => {
            const resultat = await fetch(`/api/demandes/${nom}`);
            const body = await resultat.json().catch((error) => { console.log(error) });
            if (body !== null) {
                setListeDemandes(body);
            }
            else {
                setAffichage(false)
            }
        };
        chercherDemandes();
    }, []);

    const demande = Object.values(listeDemandes)

    const confirmerSuppression = async (id) => {
        if (listeDemandes !== null) {
            await fetch(`/api/demandes/supprimer/${demande[0]}/${id}`, {
                method: 'updateOne',
            });

            setVerification(true);
        }
    };

    function affichageConfirmation() {
        if (verification === true) {
            return (
                <>
                    <div class="p-3 mb-2 bg-danger text-white">Votre chanson à bien été supprimée</div>
                </>
            )
        }
    }

    function demandeVideMessage() {
        return (
            <>
                <div class="p-3 mb-2 bg-danger text-white">Votre Liste est vide</div>
            </>
        )
    }

    return (
        <>
            {affichageConfirmation()}
            <h1>Mes demandes spéciales</h1>
            <ListGroup>
                <ListGroup.Item className={affichage === false ? "d-block" : "d-none"}>
                    {demandeVideMessage()}
                </ListGroup.Item>
            </ListGroup>
            <ListGroup>
                <ListGroup.Item className={affichage === true ? "d-block" : "d-none"}>
                    <Table striped bordered hover >
                        <thead>
                            <tr>
                                <th>Titre</th>
                                <th>Artiste</th>
                                <th>Categories</th>
                                <th>Supprimer Pieces</th>
                            </tr>
                        </thead>
                        <tbody>
                            {demande[2].map((chansons => {
                                return (
                                    <tr>
                                        <td>{chansons.titre}</td>
                                        <td>{chansons.artiste}</td>
                                        <td>
                                            <ol>
                                                {chansons.categories.map((categorie => {
                                                    return (
                                                        <li>{categorie}</li>
                                                    )
                                                }))}
                                            </ol>
                                        </td>
                                        <td>
                                            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                                                <Button variant="danger" onClick={() => confirmerSuppression(chansons._id)}>Supprimer</Button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            }))}
                        </tbody>
                    </Table>
                </ListGroup.Item>
            </ListGroup>
            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <Link to="/demande-speciale">
                    <Button variant="success">Ajouter des Pieces</Button>
                </Link>
            </div>
        </>
    )
}

export default AfficherHistorique;