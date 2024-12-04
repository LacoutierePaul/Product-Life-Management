-- Table des Fournisseurs
CREATE TABLE fournisseurs (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    contact VARCHAR(255),
    matiere_premiere VARCHAR(255),
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
    unite VARCHAR(50)
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

-- Table de Suivi Environnemental
CREATE TABLE suivi_environnemental (
    id SERIAL PRIMARY KEY,
    mois DATE NOT NULL,
    eau_utilisee FLOAT,
    energie_utilisee FLOAT,
    dechets_produits FLOAT,
    objectif_eau FLOAT,
    objectif_energie FLOAT,
    objectif_dechets FLOAT
);