import {react, useState} from 'react';
import {Form, Button, Card} from 'react-bootstrap'


function FormulaireLogin(){

    const [nomUtilisateur, setNomUtilisateur] = useState();
    const [motDePasse, setMotDePasse] = useState();

const envoyerFormulaire = async () => {
       
        await fetch(`/api/utilisateur/ajouter`, {
            method: 'post',
            body: JSON.stringify({nomUtilisateur,motDePasse}),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };

    return (

         <Form className="card mt-5">
                <Card.Header as="h4">Connexion</Card.Header>
                <Form.Group className="p-2">
                <Form.Label>Nom Utilisateur</Form.Label>
                <Form.Control type="text" value={nomUtilisateur} 
                    onChange={(event) => setNomUtilisateur(event.target.value)} />
                </Form.Group>
                <Form.Group className="p-2">
                <Form.Label>Mot de passe</Form.Label>
                <Form.Control type="password" value={motDePasse} 
                    onChange={(event) => setMotDePasse(event.target.value)} />
                </Form.Group>
                <Button variant="outline-success" size="lg" onClick={envoyerFormulaire}>Se connecter</Button>
                <Button className="mt-2" variant="outline-warning" size="lg" to="/">Vous n'avez pas de compte ?</Button>             
            </Form>
    )
}

export default FormulaireLogin;
