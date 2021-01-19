import {
    React,
    useState,
    useEffect
} from 'react';

import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Redirect } from 'react-router-dom';

function FormulaireModifierPiece({ id }) {
    const [titre, setTitre] = useState('');
    const [artiste, setArtiste] = useState('');
    const [categories, setCategories] = useState(['']);
    const [rediriger, setRediriger] = useState(false);

    useEffect(() => {
        const chercherDonnees = async () => {
            const resultat = await fetch(`/api/pieces/${id}`);
            const body = await resultat.json().catch((error) => {console.log(error)});
            setTitre(body.titre);
            setArtiste(body.artiste);
            setCategories(body.categories);
        };
        chercherDonnees();
    }, [id]);

    const envoyerFormulaire = async () => {
        // Enlever les chaînes vides de l'array
        const nouvellesCategories = categories.filter(categorie =>
            categorie !== '');

        await fetch(`/api/pieces/modifier/${id}`, {
            method: 'post',
            body: JSON.stringify({ titre, artiste, categories: nouvellesCategories }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        setRediriger(true);
    };

    function afficherRedirection() {
        if (rediriger === true) {
            return <Redirect to="/admin" />
        }
    }

    function ajouterCategorie() {
        const nouvellesCategories = categories.slice();
        nouvellesCategories.push("");
        setCategories(nouvellesCategories);
    }
    
    return (
    <>
        {afficherRedirection()}
        <Form className="mb-1">
            <Form.Group>
                <Form.Label>Titre</Form.Label>
                <Form.Control type="text" value={titre} 
                    onChange={(event) => setTitre(event.target.value)} />
            </Form.Group>

            <Form.Group>
                <Form.Label>Artiste / Groupe</Form.Label>
                <Form.Control type="text" value={artiste} 
                    onChange={(event) => setArtiste(event.target.value)} />
            </Form.Group>

            <Form.Group>
                <Form.Label>
                    Catégories
                    <Button variant="primary" className="ml-2" 
                        onClick={ajouterCategorie}>
                        Ajouter une catégorie
                    </Button>
                </Form.Label>
                {
                    categories.map((categorie, index) =>
                        <Form.Control key={index} type="text" value={categorie} 
                            className="mb-1" 
                            onChange={(event) => {
                                const nouvellesCategories = categories.slice();
                                nouvellesCategories[index] = event.target.value;
                                setCategories(nouvellesCategories);
                            }} />
                    )
                }                
            </Form.Group>

            <Button variant="success" onClick={envoyerFormulaire} >
                Modifier
            </Button>
        </Form>
    </>
    );
}

export default FormulaireModifierPiece;