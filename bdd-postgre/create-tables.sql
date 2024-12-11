-- Créer les tables
-- Table des Fournisseurs
CREATE TABLE fournisseurs (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    contact VARCHAR(255),
    matiere_premiere VARCHAR(255)  NOT NULL, 
    date_derniere_livraison DATE,
    evaluation SMALLINT,
    commentaires TEXT
);

-- Table des Stocks
CREATE TABLE stocks (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL,
    quantite INTEGER DEFAULT 0,
    seuil_minimal INTEGER DEFAULT 0,
    unite VARCHAR(50),
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des Mouvements de Stock
CREATE TABLE mouvements_stock (
    id SERIAL PRIMARY KEY,
    id_stock INTEGER REFERENCES stocks(id),
    type_mouvement VARCHAR(50) NOT NULL,
    quantite INTEGER NOT NULL,
    date_mouvement TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    raison VARCHAR(255)
);

-- Table de Planification de Production
CREATE TABLE production_planifiee (
    id SERIAL PRIMARY KEY,
    produit_fini VARCHAR(255) NOT NULL,
    quantite_planifiee INTEGER NOT NULL,
    date_production DATE,
    status VARCHAR(50) DEFAULT 'En attente'
);

-- Table de Contrôle Qualité
CREATE TABLE controle_qualite (
    id SERIAL PRIMARY KEY,
    id_production INTEGER REFERENCES production_planifiee(id),
    date_controle DATE NOT NULL,
    resultat VARCHAR(50) NOT NULL,
    commentaire TEXT
);

-- Table des Recettes
CREATE TABLE recettes (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(255) NOT NULL, -- Nom de la recette
    description TEXT,          -- Description de la recette
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des Ingrédients des Recettes (relation n-n entre recettes et fournisseurs)
CREATE TABLE ingredients_recette (
    id SERIAL PRIMARY KEY,
    id_recette INTEGER REFERENCES recettes(id) ON DELETE CASCADE,
    id_fournisseur INTEGER REFERENCES fournisseurs(id) ON DELETE CASCADE,
    nom_ingredient VARCHAR(255),

    quantite FLOAT NOT NULL, -- Quantité utilisée dans la recette
    unite VARCHAR(50) NOT NULL -- Unité de mesure (kg, litre, etc.)
);


-- Charger les données
COPY fournisseurs FROM '/data/fournisseurs.csv' DELIMITER ',' CSV HEADER;
COPY stocks FROM '/data/stocks.csv' DELIMITER ',' CSV HEADER;

COPY mouvements_stock FROM '/data/mouvements_stock.csv' DELIMITER ',' CSV HEADER;
COPY production_planifiee FROM '/data/production_planifiee.csv' DELIMITER ',' CSV HEADER;
COPY controle_qualite FROM '/data/controle_qualite.csv' DELIMITER ',' CSV HEADER;
COPY recettes FROM '/data/recettes.csv' DELIMITER ',' CSV HEADER;
COPY ingredients_recette FROM '/data/ingredients_recette.csv' DELIMITER ',' CSV HEADER;

SELECT setval('stocks_id_seq', 20, true);
SELECT setval('fournisseurs_id_seq', 20, true);
SELECT setval('mouvements_stock_id_seq', 20, true);
SELECT setval('production_planifiee_id_seq', 20, true);
SELECT setval('controle_qualite_id_seq', 20, true);
SELECT setval('recettes_id_seq', 20, true);
SELECT setval('ingredients_recette_id_seq', 20, true);
