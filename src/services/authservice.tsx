import React, { Component } from "react";
import axios from "axios";
import Constants from "../utilities/Constants";

// interface loginProps {
//   username: string;
//   password: string;
// }
// interface registerProps {
//   username: string;
//   email: string;
//   password: string;
// }

export class AuthService extends Component<{}, {}> {
  login(username: string, password: string): Promise<any> {
    return axios
      .post(Constants.API_URL_LOGIN, {
        username,
        password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      })
      .catch((err) => {
        return {
          statusCode: err.request.status,
          statusMessage: err.response.data,
        };
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username: string, email: string, password: string): Promise<any> {
    return axios.post(Constants.API_URL_REGISTER, {
      username,
      email,
      password,
    });
    // .then((res) => {
    //   console.log("aaaaaaaa", res);
    //   return;
    // })
    // .catch((err) => {
    //   console.log("bbbbbbbbb", err);
    //   return;
    // });
  }

  getCurrentUser() {
    let userString = localStorage.getItem("user");
    let user = null;
    if (userString) {
      try {
        user = JSON.parse(userString);
      } catch {
        console.log("Error");
      }
    }
    if (user === null) return console.log("Unable to get user");
    return user as any;
  }
}

// export default new AuthService();

// import React, { Component } from "react";
// import axios from "axios";
// import Constants from "../utilities/Constants";

// interface loginProps {
//   username: string;
//   password: string;
// }

// interface registerProps {
//   username: string;
//   email: string;
//   password: string;
// }

// interface User {
//   accessToken?: string;
// }

// export class AuthService extends Component<{}, {}> {
//   login(username: string, password: string): Promise<User> {
//     return axios
//       .post(Constants.API_URL_LOGIN, {
//         username,
//         password,
//       })
//       .then((response) => {
//         if (response.data.accessToken) {
//           localStorage.setItem("user", JSON.stringify(response.data));
//         }

//         return response.data;
//       });
//   }

//   logout() {
//     localStorage.removeItem("user");
//   }

//   register(data: registerProps): Promise<void> {
//     return axios.post(Constants.API_URL_REGISTER, data);
//   }

//   getCurrentUser(): User | null {
//     const userString = localStorage.getItem("user");
//     let user: User | null = null;
//     if (userString) {
//       try {
//         user = JSON.parse(userString);
//       } catch {
//         console.log("Error");
//       }
//     }
//     if (user === null) return null;
//     return user;
//   }
// }
