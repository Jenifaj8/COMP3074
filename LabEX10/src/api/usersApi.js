const BASE_URL = 'https://jsonplaceholder.typicode.com';

// Retrieve all users
export async function getUsers() {
    const response = await fetch(`${BASE_URL}/users`);

    if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
    }

    return await response.json();
}

// Retrieve a specific user by ID
export async function getUser(id) {
    const response = await fetch(`${BASE_URL}/users/${id}`);

    if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
    }

    return await response.json();
}