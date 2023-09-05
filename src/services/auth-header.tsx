export default function authHeader() {
  const userString = localStorage.getItem("user");
  let user = null;

  if (userString) {
    try {
      user = JSON.parse(userString);
    } catch {
      console.log("Error");
    }
  }

  if (user && user.accessToken) {
    console.log("Auth-header");
    console.log("Authorization: Bearer " + user.accessToken);
    return { Authorization: "Bearer " + user.accessToken };
  } else {
    return {};
  }
}
