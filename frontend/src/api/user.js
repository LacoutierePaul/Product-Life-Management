const BASE_URL="http://localhost:3000";

export const GetUsers = async() => {
    const response = await fetch(`${BASE_URL}/user`);
    if (!response.ok){
        throw new Error('Erreur HTTP ! status : ${response.status}');
    }
    return response.json();
};

export const AddUser = async(data) =>{
    const response = await fetch(`${BASE_URL}/user`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    if (!response.ok){
        throw new Error('Erreur HTTP ! status : ${response.status}');
    }
    return response.json();
}

export const UpdateUser = async(iduser, data) =>{
    const response = await fetch(`${BASE_URL}/user/${iduser}`,{
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    if (!response.ok){
        throw new Error('Erreur HTTP ! status : ${response.status}');
    }
    return response.json();
}

export const DeleteUser = async(iduser) =>{
    const response = await fetch(`${BASE_URL}/user/${iduser}`,{
        method: "DELETE",
    });
    if (!response.ok){
        throw new Error('Erreur HTTP ! status : ${response.status}');
    }
    if (response.status === 204 || response.status === 200 && response.headers.get("Content-Length") === "0") {
        // Retournez simplement un succès si la réponse est vide
        return;
    }
    return await response.json();
}

export const Login = async (email_user, password_user) => {
    try {
        const response = await fetch('http://localhost:3000/login/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email_user, password_user }),
        });

        if (response.status === 401) {
            throw new Error('Identifiants incorrects. Veuillez réessayer.');
        }

        if (response.status === 500) {
            throw new Error('Erreur interne du serveur. Veuillez réessayer plus tard.');
        }

        if (response.status === 200) {
            return await response.json(); // Récupère et renvoie les données utilisateur
        }

        throw new Error(`Erreur inattendue. Code HTTP : ${response.status}`);
    } catch (error) {
        console.error('Erreur dans Login:', error.message);
        throw error;
    }
};

export const Logout = async() =>{
    const response = await fetch(`${BASE_URL}/login/logout`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        }
    });
    if (!response.ok){
        throw new Error('Erreur HTTP ! status : ${response.status}');
    }
    return response.json();
}
