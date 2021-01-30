import { React, useState, useEffect } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';


function AfficherHistorique() {

    const nom = sessionStorage.getItem('user');
    // objet    
    const [listeDemandes, setListeDemandes] = useState({});


    useEffect(() => {
       
        const chercherDemandes = async () => {
            const resultat = await fetch(`/api/demandes/${nom}`);
            const body = await resultat.json().catch((error) => { console.log(error) });
            console.log(body);
            setListeDemandes(body);
        };
        chercherDemandes();
        console.log(nom);
    });

    const demande = Object.values(listeDemandes);
    console.log(demande);

    return (
        <>
            <h1>Mes demandes spéciales</h1>
            <ListGroup>
                <ListGroup.Item >
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
                                    <tr>

                                        {demande[2].map((chansons => {
                                            return(
                                                <td>{chansons.titre}</td>
                                            )
                                        }))}
                                        
                                        <td></td>
                                        <td></td>
                                        <td></td>

                                    </tr>
                        </tbody>
                    </Table>
                </ListGroup.Item>
            </ListGroup>

            <Button variant="success">Ajouter Pieces</Button>

        </>
    )
}

export default AfficherHistorique;