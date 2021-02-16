import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Form from "react-bootstrap/Form";

function Langages() {
  const { i18n } = useTranslation();
  

  useEffect(() => i18n.changeLanguage("fr"), [i18n]);

  function changerLangue(langue) {
    i18n.changeLanguage(langue);
  }

  return (
    
    <Form.Group style={{marginBottom:'0', marginRight:'10px'}}>
      <Form.Control
        as="select"
        onChange={(event) => changerLangue(event.target.value)}
        style = {{width:'100%'}}
      >
        <option value="fr">Francais</option>
        <option value="en">English</option>
      </Form.Control>
    </Form.Group>
  );
}

export default Langages;
