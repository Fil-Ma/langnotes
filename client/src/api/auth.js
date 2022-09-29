const baseAuthURL = '/api/auth';

// API request for login
export const login = async (credentials) => {
  console.log("API - Contacting server to login user");

  try {
    const urlToFetch = baseAuthURL + '/login';

    console.log(`API - Contacting server at URL ${urlToFetch}`);

    const response = await fetch(urlToFetch, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    });

    const jsonResponse = await response.json();

    console.log("API - Received server response");
    return jsonResponse;

  } catch(err) {
    throw new Error(err);
  }
};

// API request for register
export const register = async (data) => {
  console.log("API - Contacting server to register user");

  try {
    const urlToFetch = baseAuthURL + '/register';

    console.log(`API - Contacting server at URL ${urlToFetch}`);

    const response = await fetch(urlToFetch, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    console.log("API - Received server response");
    const jsonResponse = await response.json();

    return jsonResponse;

  } catch(err) {
    throw new Error(err);
  }
};

// API request to check if the user is logged in
export const isLoggedIn = async () => {
  //console.log("API - Contacting server for user login status");

  try {
    const urlToFetch = baseAuthURL + '/logged_in';

    //console.log(`API - Contacting server at URL ${urlToFetch}`);
    const response = await fetch(urlToFetch);

    const jsonResponse = await response.json();

    return jsonResponse;

  } catch(err) {
    throw new Error(err);
  }
};

// API request for logout
export const logout = async () => {
  console.log("API - Contacting server for user logout");

  try {
    const urlToFetch = baseAuthURL + '/logout';

    console.log(`API - Contacting server at URL ${urlToFetch}`);
    await fetch(urlToFetch, { method: 'POST' });

    return;

  } catch(err) {
    throw new Error(err);
  }
};
