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
    CONSTRAINT FK_mouvements_stocks_idstock FOREIGN KEY (idstock) REFERENCES stocks (idstock) ON DELETE CASCADE
);

CREATE TABLE production_planifiee (
    idproductionplanifiee SERIAL NOT NULL,
    quantite_planifiee INT,
    status VARCHAR(50),
   "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    idrecette SERIAL,
    CONSTRAINT PK_production_planifiee PRIMARY KEY (idproductionplanifiee),
    CONSTRAINT FK_production_planifiee_idrecette FOREIGN KEY (idrecette) REFERENCES recettes (idrecette) ON DELETE CASCADE
);


CREATE TABLE controle_qualite (
    idcontrole SERIAL NOT NULL,
    resultat VARCHAR(50),
    commentaire_controle TEXT,
    idproductionplanifiee SERIAL,
      "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT PK_controle_qualite PRIMARY KEY (idcontrole),
    CONSTRAINT FK_controle_qualite_idproductionplanifiee FOREIGN KEY (idproductionplanifiee) REFERENCES production_planifiee (idproductionplanifiee) ON DELETE CASCADE
);


CREATE TABLE fournisseurs_to_stocks (
    idfournisseur SERIAL NOT NULL,
    idstock SERIAL NOT NULL,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT PK_fournit PRIMARY KEY (idfournisseur, idstock),
    CONSTRAINT FK_fournit_idfournisseur FOREIGN KEY (idfournisseur) REFERENCES fournisseurs (idfournisseur) ON DELETE CASCADE,
    CONSTRAINT FK_fournit_idstock FOREIGN KEY (idstock) REFERENCES stocks (idstock) ON DELETE CASCADE
);

CREATE TABLE recettes_to_stocks (
    idstock SERIAL NOT NULL,
    idrecette SERIAL NOT NULL,
     "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT PK_utilise PRIMARY KEY (idstock, idrecette),
    quantite INT,

    CONSTRAINT FK_utilise_idstock FOREIGN KEY (idstock) REFERENCES stocks (idstock) ON DELETE CASCADE,
    CONSTRAINT FK_utilise_idrecette FOREIGN KEY (idrecette) REFERENCES recettes (idrecette) ON DELETE CASCADE
);

CREATE TABLE commande_ingredients (
    idcommande SERIAL NOT NULL,
    idfournisseur SERIAL NOT NULL,
    idstock SERIAL NOT NULL,
    quantite_commande INT NOT NULL,
    date_commande TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    date_livraison TIMESTAMP,
    statut_commande VARCHAR(20) DEFAULT 'En attente',
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT PK_commande PRIMARY KEY (idcommande),
    CONSTRAINT FK_commande_idfournisseur FOREIGN KEY (idfournisseur) REFERENCES fournisseurs (idfournisseur) ON DELETE CASCADE,
    CONSTRAINT FK_commande_idstock FOREIGN KEY (idstock) REFERENCES stocks (idstock) ON DELETE CASCADE
);

COPY recettes FROM '/data/recettes.csv' DELIMITER ',' CSV HEADER;
COPY stocks FROM '/data/stocks.csv' DELIMITER ',' CSV HEADER;
COPY fournisseurs FROM '/data/fournisseurs.csv' DELIMITER ',' CSV HEADER;
COPY mouvements_stocks FROM '/data/mouvements_stock.csv' DELIMITER ',' CSV HEADER;
COPY production_planifiee FROM '/data/production_planifiee.csv' DELIMITER ',' CSV HEADER;
COPY controle_qualite FROM '/data/controle_qualite.csv' DELIMITER ',' CSV HEADER;
COPY fournisseurs_to_stocks FROM '/data/fournisseurs_to_stocks.csv' DELIMITER ',' CSV HEADER;
COPY recettes_to_stocks FROM '/data/recettes_to_stocks.csv' DELIMITER ',' CSV HEADER;
COPY commande_ingredients FROM '/data/commande_ingredients.csv' DELIMITER ',' CSV HEADER;   

-- Création des séquences

CREATE SEQUENCE seq_idstock START WITH 21 INCREMENT BY 1;
ALTER TABLE stocks ALTER COLUMN idstock SET DEFAULT nextval('seq_idstock');

CREATE SEQUENCE seq_idrecette START WITH 21 INCREMENT BY 1;
ALTER TABLE recettes ALTER COLUMN idrecette SET DEFAULT nextval('seq_idrecette');
CREATE SEQUENCE seq_idfournisseur START WITH 11 INCREMENT BY 1;
ALTER TABLE fournisseurs ALTER COLUMN idfournisseur SET DEFAULT nextval('seq_idfournisseur');
CREATE SEQUENCE seq_idmouvement START WITH 41 INCREMENT BY 1;
ALTER TABLE mouvements_stocks ALTER COLUMN idmouvement SET DEFAULT nextval('seq_idmouvement');
CREATE SEQUENCE seq_idcontrolae START WITH 31 INCREMENT BY 1;
ALTER TABLE controle_qualite ALTER COLUMN idcontrole SET DEFAULT nextval('seq_idcontrolae');
CREATE SEQUENCE seq_idproductionplanifiee START WITH 41 INCREMENT BY 1;
ALTER TABLE production_planifiee ALTER COLUMN idproductionplanifiee SET DEFAULT nextval('seq_idproductionplanifiee');

CREATE SEQUENCE seq_idcommande START WITH 11 INCREMENT BY 1;
ALTER TABLE commande_ingredients ALTER COLUMN idcommande SET DEFAULT nextval('seq_idcommande'); 