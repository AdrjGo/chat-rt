const getUsername = async () => {
  const username = localStorage.getItem("username");

  if (username) {
    console.log(`User exists: ${username}`);
    return username;
  }

  try {
    const res = await fetch(
      "https://random-data-api.com/api/users/random_user"
    );
    const data = await res.json();

    const randomUsername = data.username || `user_${Date.now()}`;

    localStorage.setItem("username", randomUsername);
    return randomUsername;
  } catch (error) {
    console.error("Error fetching user data:", error);

    const defaultUsername = `user_${Date.now()}`;
    localStorage.setItem("username", defaultUsername);
    return defaultUsername;
  }
};

export { getUsername };
