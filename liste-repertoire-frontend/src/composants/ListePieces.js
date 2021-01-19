import React from 'react';
import Alert from 'react-bootstrap/Alert'

function ListePieces({ pieces, handleClick, listeDemandes }) {
    if (pieces?.length) {
        var dictionnaireCategories = Object();

        pieces.forEach(piece => {
            piece.categories.forEach(categorie => {
                if (dictionnaireCategories[categorie] === undefined) {
                    dictionnaireCategories[categorie] = true;
                }
            })            
        });

        const categories = Object.keys(dictionnaireCategories);

        if (listeDemandes !== undefined) {
            var listeIdDemandes = Object.keys(listeDemandes);
        }        

        return (
            <>
                {categories.map((categorie) => {
                    const piecesAssociees = pieces.filter((piece) => 
                        piece.categories.indexOf(categorie) !== -1);

                    return (
                        <div key={categorie}>
                            <h4>{categorie}</h4>
                            <ul>
                                {
                                    piecesAssociees.map(piece => {
                                        if (handleClick !== undefined) {
                                            if (listeIdDemandes.includes(piece._id)) {
                                                console.log(1)
                                                return <li key={piece._id} onClick={() => handleClick(piece._id)} className="bg-info">
                                                            {piece.titre} - {piece.artiste}
                                                        </li>
                                            }
                                            else {
                                                console.log(2)
                                                return <li key={piece._id} onClick={() => handleClick(piece._id)} >
                                                            {piece.titre} - {piece.artiste}
                                                        </li>
                                            }
                                            
                                        }
                                        else {
                                            return <li key={piece._id} >
                                                        {piece.titre} - {piece.artiste}
                                                    </li>
                                        }
                                    })
                                        
                                }
                            </ul>
                        </div>
                    )
                })}
            </>
        );
    }
    else {
        return <Alert variant={"info"} >Il n'y a pas de pièces dans le répertoire.</Alert>;
    }
}

export default ListePieces;