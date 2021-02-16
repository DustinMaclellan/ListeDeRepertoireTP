import { React, useState } from "react";

import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Redirect } from "react-router-dom";
import { useTranslation } from 'react-i18next';

function FormulaireAjouterPiece({ id }) {
  const { t } = useTranslation();
  const [titre, setTitre] = useState("");
  const [artiste, setArtiste] = useState("");
  const [categories, setCategories] = useState([""]);
  const [rediriger, setRediriger] = useState(false);


  const envoyerFormulaire = async () => {
    // Enlever les chaînes vides de l'array
    const nouvellesCategories = categories.filter(
      (categorie) => categorie !== ""
    );
    
    await fetch(`/api/pieces/ajouter`, {
      method: "put",
      body: JSON.stringify({ titre, artiste, categories: nouvellesCategories }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setRediriger(true);
  };


  function afficherRedirection() {
    if (rediriger === true) {
      return <Redirect to="/admin" />;
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
          <Form.Label>{t('title')}</Form.Label>
          <Form.Control
            type="text"
            value={titre}
            onChange={(event) => setTitre(event.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>{t('artiste')}</Form.Label>
          <Form.Control
            type="text"
            value={artiste}
            onChange={(event) => setArtiste(event.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>
          {t('categorie')}
            <Button
              variant="primary"
              className="ml-2"
              onClick={ajouterCategorie}
            >
              {t('ajouterCategorie')}
            </Button>
          </Form.Label>
          {categories.map((categorie, index) => (
            <Form.Control
              key={index}
              type="text"
              value={categorie}
              className="mb-1"
              onChange={(event) => {
                const nouvellesCategories = categories.slice();
                nouvellesCategories[index] = event.target.value;
                setCategories(nouvellesCategories);
              }}
            />
          ))}
        </Form.Group>

        <Button variant="success" onClick={envoyerFormulaire}>
        {t('ajouterLaPiece')}
        </Button>
      </Form>
    </>
  );
}

export default FormulaireAjouterPiece;
