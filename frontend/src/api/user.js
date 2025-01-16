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

export const Login = async(email_user, password_user) => {
    const response = await fetch('http://localhost:3000/login/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email_user, password_user }),
    });
    if (!response.ok) {
        throw new Error('Erreur HTTP ! status : $(response.status)');
    }
    if (response.status === 204 || response.status === 200 && response.headers.get("Content-Length") === "0") {
        // Retournez simplement un succès si la réponse est vide
        return;
    }
    return await response.json();
}