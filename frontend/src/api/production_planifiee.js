const BASE_URL = "http://localhost:3000";

export const getRecipeOrders = async () => {
    const response = await fetch(`${BASE_URL}/production_planifiee`);
    if (!response.ok) {
        throw new Error(`Erreur HTTP ! statut : ${response.status}`);
    }
    if (response.status === 204 || response.status === 200 && response.headers.get("Content-Length") === "0") {
        return;
    }
    return response.json();
};

export const addProductionPlanifiee = async (data) => {
    const response = await fetch(`${BASE_URL}/production_planifiee`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        throw new Error(`Erreur HTTP ! statut : ${response.status}`);
    }
    return response.json();
};

export const updateProductionPlanifiee = async (idproduction_planifiee, data) => {
    const response = await fetch(`${BASE_URL}/production_planifiee/${idproduction_planifiee}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        throw new Error(`Erreur HTTP ! statut : ${response.status}`);
    }
    return response.json();
};

export const deleteProductionPlanifiee = async (idproduction_planifiee) => {
    const response = await fetch(`${BASE_URL}/production_planifiee/${idproduction_planifiee}`, {
        method: "DELETE",
    });
    if (!response.ok) {
        throw new Error(`Erreur HTTP ! statut : ${response.status}`);
    }
    if (response.status === 204 || response.status === 200 && response.headers.get("Content-Length") === "0") {
        // Retournez simplement un succès si la réponse est vide
        return;
    }
    return await response.json();
};
