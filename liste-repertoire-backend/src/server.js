import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient, ObjectId, ObjectID } from 'mongodb';

const app = express();

app.use(bodyParser.json());

// Fonction de connexion a la BD
const utiliserDB = async (operations, reponse) => {
    try {
        const client = await MongoClient.connect('mongodb://localhost:27017', { useUnifiedTopology: true });
        const db = client.db('liste-repertoire');

        await operations(db);

        client.close();
    }
    catch (erreur) {
        reponse.status(500).send("Erreur de connexion à la bd", erreur);
    }
};

// Pieces

app.get('/api/pieces', (requete, reponse) => {
    utiliserDB(async (db) => {
        const listePieces = await db.collection('pieces').find().toArray();
        reponse.status(200).json(listePieces);
    }, reponse).catch(
        () => reponse.status(500).send("Erreur lors de la requête")
    );
});

app.get('/api/pieces/:id', (requete, reponse) => {
    const id = requete.params.id;

    utiliserDB(async (db) => {
        var objectId = ObjectID.createFromHexString(id);
        const infoPiece = await db.collection('pieces').findOne({ _id: objectId });
        reponse.status(200).json(infoPiece);
    }, reponse).catch(
        () => reponse.status(500).send("Pièce non trouvée")
    );
});

app.put('/api/pieces/ajouter', (requete, reponse) => {
    const { titre, artiste, categories } = requete.body;

    if (titre !== undefined && artiste !== undefined && categories !== undefined) {
        utiliserDB(async (db) => {
            await db.collection('pieces').insertOne({
                titre: titre,
                artiste: artiste,
                categories: categories
            });

            reponse.status(200).send("Pièce ajoutée");
        }, reponse).catch(
            () => reponse.status(500).send("Erreur : la pièce n'a pas été ajoutée")
        );
    }
    else {
        reponse.status(500).send(`Certains paramètres ne sont pas définis :
            - titre: ${titre}
            - artiste: ${artiste}
            - categories: ${categories}`);
    }
});

app.post('/api/pieces/modifier/:id', (requete, reponse) => {
    const { titre, artiste, categories } = requete.body;
    const id = requete.params.id;

    if (titre !== undefined && artiste !== undefined && categories !== undefined) {
        utiliserDB(async (db) => {
            var objectId = ObjectID.createFromHexString(id);
            await db.collection('pieces').updateOne({ _id: objectId }, {
                '$set': {
                    titre: titre,
                    artiste: artiste,
                    categories: categories
                }
            });

            reponse.status(200).send("Pièce modifiée");
        }, reponse).catch(
            () => reponse.status(500).send("Erreur : la pièce n'a pas été modifiée")
        );
    }
    else {
        reponse.status(500).send(`Certains paramètres ne sont pas définis :
            - titre: ${titre}
            - artiste: ${artiste}
            - categories: ${categories}`);
    }
});

app.delete('/api/pieces/supprimer/:id', (requete, reponse) => {
    const id = requete.params.id;

    utiliserDB(async (db) => {
        var objectId = ObjectID.createFromHexString(id);
        const resultat = await db.collection('pieces').deleteOne({ _id: objectId });

        reponse.status(200).send(`${resultat.deletedCount} pièce supprimée`);
    }, reponse).catch(
        () => reponse.status(500).send("Erreur : la pièce n'a pas été supprimée")
    );
});

// Demandes

app.get('/api/demandes', (requete, reponse) => {
    utiliserDB(async (db) => {
        const listeDemandes = await db.collection('demandes').find().toArray();
        reponse.status(200).json(listeDemandes);
    }, reponse).catch(
        () => reponse.status(500).send("Erreur lors de la requête")
    );
});

app.get('/api/demandes/:nomClient', (requete, reponse) => {
    const nomClient = requete.params.nomClient;

    utiliserDB(async (db) => {
        const listeDemandesClient = await db.collection('demandes').find({ nomClient: nomClient}).toArray();
        reponse.status(200).json(listeDemandesClient);
    }, reponse).catch(
        () => reponse.status(500).send("Erreur lors de la requête")
    );
});

app.get('/api/demandes/:nomClient/:dateAjout', (requete, reponse) => {
    const nomClient = requete.params.nomClient;
    const dateAjout = requete.params.dateAjout;
    const listePieces = [];

    if(nomClient !== undefined && dateAjout !== undefined) {
        utiliserDB(async (db) => {
            const listeDemandesClient = await db.collection('demandes').find({ nomClient: nomClient, dateAjout: dateAjout}).toArray();
            listeDemandesClient.forEach(element => {
                listePieces.push(element.pieces);
                console.log(listePieces);
            });
            reponse.status(200).json(listePieces);
        }, reponse).catch(
            () => reponse.status(500).send("Erreur lors de la requête")
        );
    }
    else{
         reponse.status(500).send(`Certains paramètres ne sont pas définis :
            - nomClient: ${nomClient}
            - dateAjout: ${dateAjout}`);
    }
});

app.put('/api/demandes/ajouter', (requete, reponse) => {
    const { nom, pieces } = requete.body;
    let date_ob = new Date();
    let jour = ("0" + date_ob.getDate()).slice(-2);
    let mois = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let annee = date_ob.getFullYear();

    var dateAujourdhui = (annee + "-" + mois + "-" + jour)
    if (nom !== undefined && pieces !== undefined) {
            utiliserDB(async (db) => {  
                    await db.collection('demandes').insertOne({
                        nomClient: nom,
                        pieces: pieces,
                        dateAjout: dateAujourdhui,
                        actif: 1
                    });
                    reponse.status(200).send("Demande ajouter");
            }, reponse).catch(
                () => reponse.status(500).send("Erreur : la demande n'a pas été ajouter")
            );
        }
    else {
        reponse.status(500).send(`Certains paramètres ne sont pas définis :
            - nom: ${nom}
            - pieces: ${pieces}
            - ajoutDate : ${dateAujourdhui}`);
    }
});

app.put('/api/demandes/inactive/:id', (requete, reponse) => {
    const id = requete.params.id;

    utiliserDB(async (db) => {
        var objectId = ObjectID.createFromHexString(id);
        const verificationActif = await db.collection('demandes').findOne({_id : objectId})
        if(verificationActif.actif == 1) {
            await db.collection('demandes').updateOne({ _id: objectId }, {
                '$set': {
                    actif: 0
                }
            });
            reponse.status(200).send(`Pièce inactive`);
        }
        else {
            await db.collection('demandes').updateOne({ _id: objectId }, {
                '$set': {
                    actif: 1
                }
            });
            reponse.status(200).send(`Pièce active`);
        }
    }, reponse).catch(
        () => reponse.status(500).send("Erreur : la pièce n'a pas été mis a inactive")
    );
});

// Login
app.post('/api/utilisateur/verification', (requete, reponse) => {
    const { nomUtilisateur, motDePasse } = requete.body;

    if (nomUtilisateur !== undefined || motDePasse !== undefined) {
        utiliserDB(async (db) => {
            const verificationUtilisateur = await db.collection('utilisateurs').findOne({ nomUtilisateur: nomUtilisateur, motDePasse: motDePasse })
                if (verificationUtilisateur != undefined) {
                    if(nomUtilisateur == "admin"){
                        reponse.status(200).json("admin");
                    }
                    else {
                        reponse.status(200).json("true");
                    }
                }
                else {
                    reponse.status(400).json("false");
                }
            });
    }
});

app.post('/api/registraire', (requete, reponse) => {
    const { nomUtilisateur, motDePasse } = requete.body;

    if (nomUtilisateur !== undefined && motDePasse !== undefined) {
        utiliserDB(async (db) => {
            if(await db.collection('utilisateurs').findOne({ nomUtilisateur: nomUtilisateur, motDePasse: motDePasse })){
                reponse.status(200).send("Utilisateur existe deja");
            }
            else {
                await db.collection('utilisateurs').insertOne({
                    nomUtilisateur: nomUtilisateur,
                    motDePasse: motDePasse
                });
                reponse.status(200).send("Utilisateur ajouté");
            }
        }, reponse).catch(
            () => reponse.status(500).send("Erreur : l'utilisateur existe deja")
        );
    }
    else {
        reponse.status(500).send(`Certains paramètres ne sont pas définis :
            - nomUtilisateur: ${nomUtilisateur}
            - motDePasse: ${motDePasse}`);
    }
});
app.listen(8000, () => console.log("Serveur démarré sur le port 8000"));