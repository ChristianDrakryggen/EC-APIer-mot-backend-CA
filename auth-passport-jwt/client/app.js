const rootURL = "/api/";

//register user
const registerUser = async () => {
  const username = document.querySelector("#register-username").value;
  const password = document.querySelector("#register-password").value;

  const user = {
    username,
    password,
  };

  try {
    const res = await fetch(`${rootURL}register`, {
      method: "post",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);
  } catch (error) {
    console.error("Error: ", error);
  }

  document.querySelector("#register-username").value = "";
  document.querySelector("#register-password").value = "";
};

//login user
const loginUser = async () => {
  const username = document.querySelector("#login-username").value;
  const password = document.querySelector("#login-password").value;

  const user = {
    username,
    password,
  };

  try {
    const res = await fetch(`${rootURL}login`, {
      method: "post",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.status !== 401) {
      const data = await res.json();
      console.log(data);
    } else {
      throw "Wrong username or password";
    }
  } catch (error) {
    console.error("Error: ", error);
  }

  document.querySelector("#login-username").value = "";
  document.querySelector("#login-password").value = "";
};

//check if user is logged in
const checkLoggedInStatus = async () => {
  try {
    const res = await fetch(`${rootURL}authenticated`);
    if (res.status !== 401) {
      const data = await res.json();
      console.log(data);
    } else {
      throw "You are not logged in!";
    }
  } catch (error) {
    console.error("Error: ", error);
  }
};

const logout = async () => {
  try {
    const res = await fetch(`${rootURL}logout`);
    if (res.status !== 401) {
      const data = await res.json();
      console.log(data);
    } else {
      throw "You need to be logged in in order to log out";
    }
  } catch (error) {
    console.error("Error: ", error);
  }
};
