import {
    React,
    useState,
    useEffect
} from 'react';

import ListGroup from 'react-bootstrap/ListGroup';

function PageListeDemandes() {
    const [listeDemandes, setListeDemandes] = useState([]);

    useEffect(() => {
        const chercherDonnees = async () => {
            const resultat = await fetch(`/api/demandes`);
            const body = await resultat.json().catch((error) => {console.log(error)});
            setListeDemandes(body);
        };
        chercherDonnees();
    }, []);

    return (
        <>
            <h1>Demandes spéciales</h1>
            <ListGroup>
            {
                listeDemandes.map(demande => 
                    <ListGroup.Item>
                        <h4>{demande.nom}</h4>
                        <ul>
                        {
                            demande.pieces.map(piece => <li>{piece}</li>)
                        }
                        </ul>
                        
                    </ListGroup.Item>
                )
            }
            </ListGroup>
            
        </>
    );
}

export default PageListeDemandes;