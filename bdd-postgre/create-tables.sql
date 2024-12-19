-- Création des tables

CREATE TABLE stocks (
    idstock SERIAL NOT NULL,
    nom_ingredient VARCHAR(50),
    quantite INT,
    seuil_minimal INT,
    unite VARCHAR(5),
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT PK_stocks PRIMARY KEY (idstock)
);

CREATE TABLE recettes (
    idrecette SERIAL NOT NULL,
    nom_recette VARCHAR(50),
    description VARCHAR(500),
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT PK_recette PRIMARY KEY (idrecette)
);

CREATE TABLE fournisseurs (
    idfournisseur SERIAL NOT NULL,
    nom_fournisseur VARCHAR(30),
    contact VARCHAR(100),
    evaluation INT,
    commentaire VARCHAR(500),
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT PK_fournisseurs PRIMARY KEY (idfournisseur)
);

CREATE TABLE mouvements_stocks (
    idmouvement SERIAL NOT NULL,
    type_mouvement VARCHAR(500),
    quantite_moved INT,
    raison VARCHAR(500),
    idstock SERIAL,
     "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT PK_mouvements_stocks PRIMARY KEY (idmouvement),
    CONSTRAINT FK_mouvements_stocks_idstock FOREIGN KEY (idstock) REFERENCES stocks (idstock)
);

CREATE TABLE production_planifiee (
    idproductionplanifiee SERIAL NOT NULL,
    quantite_planifiee INT,
    status VARCHAR(50),
   "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    idrecette SERIAL,
    CONSTRAINT PK_production_planifiee PRIMARY KEY (idproductionplanifiee),
    CONSTRAINT FK_production_planifiee_idrecette FOREIGN KEY (idrecette) REFERENCES recettes (idrecette)
);


CREATE TABLE controle_qualite (
    idcontrole SERIAL NOT NULL,
    resultat VARCHAR(50),
    commentaire_controle TEXT,
    idproductionplanifiee SERIAL,
      "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT PK_controle_qualite PRIMARY KEY (idcontrole),
    CONSTRAINT FK_controle_qualite_idproductionplanifiee FOREIGN KEY (idproductionplanifiee) REFERENCES production_planifiee (idproductionplanifiee)
);


CREATE TABLE fournisseurs_to_stocks (
    idfournisseur SERIAL NOT NULL,
    idstock SERIAL NOT NULL,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT PK_fournit PRIMARY KEY (idfournisseur, idstock),
    CONSTRAINT FK_fournit_idfournisseur FOREIGN KEY (idfournisseur) REFERENCES fournisseurs (idfournisseur),
    CONSTRAINT FK_fournit_idstock FOREIGN KEY (idstock) REFERENCES stocks (idstock)
);

CREATE TABLE recettes_to_stocks (
    idstock SERIAL NOT NULL,
    idrecette SERIAL NOT NULL,
     "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT PK_utilise PRIMARY KEY (idstock, idrecette),
    CONSTRAINT FK_utilise_idstock FOREIGN KEY (idstock) REFERENCES stocks (idstock),
    CONSTRAINT FK_utilise_idrecette FOREIGN KEY (idrecette) REFERENCES recettes (idrecette)
);

COPY recettes FROM '/data/recettes.csv' DELIMITER ',' CSV HEADER;
COPY stocks FROM '/data/stocks.csv' DELIMITER ',' CSV HEADER;
COPY fournisseurs FROM '/data/fournisseurs.csv' DELIMITER ',' CSV HEADER;
COPY mouvements_stocks FROM '/data/mouvements_stock.csv' DELIMITER ',' CSV HEADER;
COPY production_planifiee FROM '/data/production_planifiee.csv' DELIMITER ',' CSV HEADER;
COPY controle_qualite FROM '/data/controle_qualite.csv' DELIMITER ',' CSV HEADER;
COPY fournisseurs_to_stocks FROM '/data/fournisseurs_to_stocks.csv' DELIMITER ',' CSV HEADER;
COPY recettes_to_stocks FROM '/data/recettes_to_stocks.csv' DELIMITER ',' CSV HEADER;

-- Création des séquences

CREATE SEQUENCE seq_stocks START WITH 20 INCREMENT BY 1;
CREATE SEQUENCE seq_recettes START WITH 20 INCREMENT BY 1;
CREATE SEQUENCE seq_fournisseurs START WITH 10 INCREMENT BY 1;
CREATE SEQUENCE seq_mouvements_stocks START WITH 40 INCREMENT BY 1;
CREATE SEQUENCE seq_controle_qualite START WITH 24 INCREMENT BY 1;
CREATE SEQUENCE seq_production_planifiee START WITH 40 INCREMENT BY 1;