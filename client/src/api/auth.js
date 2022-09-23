const baseAuthURL = '/api/auth';

// API request for login
export const login = async (credentials) => {
  try {
    const urlToFetch = baseAuthURL + '/login';

    const response = await fetch(urlToFetch, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    });

    const jsonResponse = await response.json();

    return jsonResponse;

  } catch(err) {
    throw new Error(err);
  }
};

// API request for register
export const register = async (data) => {
  try {
    const urlToFetch = baseAuthURL + '/register';

    const response = await fetch(urlToFetch, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const jsonResponse = await response.json();

    return jsonResponse;

  } catch(err) {
    throw new Error(err);
  }
};

// API request to check if the user is logged in
export const isLoggedIn = async () => {
  try {
    const urlToFetch = baseAuthURL + '/logged_in';

    const response = await fetch(urlToFetch);

    const jsonResponse = await response.json();

    return jsonResponse;

  } catch(err) {
    throw new Error(err);
  }
};

// API request for logout
export const logout = async () => {
  try {
    const urlToFetch = baseAuthURL + '/logout';

    const response = await fetch(urlToFetch, { method: 'POST' });

    const jsonResponse = await response.json();

    return jsonResponse;

  } catch(err) {
    throw new Error(err);
  }
};
