import axios from "axios";
import * as alertify from 'alertify.js';
import Swal from "sweetalert2";

// const base_url = "http://api.devhubweb.com";
const base_url = "http://127.0.0.1:8000";

export const postany = (url, data) => {

  return axios(base_url + url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json', // whatever you want
    },
    data: data,
  }).then(res => {
      return res
    }
    , err => {
      alertify.alert("Cannot perform the operation");
      return err

    }
  );

};


export const post = (url, data) => {

  return axios(base_url + url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json', // whatever you want
      Authorization: "Bearer "+localStorage.getItem("AccessToken")
    },
    data: data,
  }).then(
    res => {
          return res
    }
    , err => {
      if (err.response && err.response.status === 401) {
        let obj = {
          "refresh": localStorage.getItem("RefreshToken")
        };
        return axios(base_url + "/refresh/", {
          method: 'POST',
          headers: {
            'content-type': 'application/json', // whatever you want
          },
          data: obj,
        }).then(
          res => {
            localStorage.setItem("AccessToken", res.data["access"]);
            return axios(base_url + url, {
              method: 'POST',
              headers: {
                'content-type': 'application/json', // whatever you want
                Authorization: localStorage.getItem("AccessToken")
              },
              data: data,
            }).then(res => {
                return res
              }
              , err => {
                alertify.alert("Cannot perform the operation");
                return err

              }
            );
          }
          , err => {
            if (err.response && err.response.status === 401) {
              console.log(err.response.data["Error"]);
              // localStorage.setItem("previous", window.location.hash);
              // localStorage.removeItem("AccessToken");
              // window.location = `#/login`;

            } else {
              alertify.alert("Cannot perform the operation");
              return err
            }
          }
        );


      } else {
        return err
      }
    }
  );

};


// export const post = (url, data) => {
//
//   return axios(base_url + url, {
//     method: 'POST',
//     headers: {
//       'content-type': 'application/json', // whatever you want
//       Authorization: localStorage.getItem("AccessToken")
//     },
//     data: data,
//   }).then(
//     res => {
//       return res
//     }
//     , err => {
//       if (err.response && err.response.status === 401) {
//         let obj = {
//           "refresh": localStorage.getItem("RefreshToken")
//         }
//         return axios(base_url + "/refresh/", {
//           method: 'POST',
//           headers: {
//             'content-type': 'application/json', // whatever you want
//           },
//           data: obj,
//         }).then(
//           res => {
//             localStorage.setItem("AccessToken", res.data["access"]);
//             return axios(base_url + url, {
//               method: 'POST',
//               headers: {
//                 'content-type': 'application/json', // whatever you want
//                 Authorization: localStorage.getItem("AccessToken")
//               },
//               data: data,
//             }).then(res => {
//                 return res
//               }
//               , err => {
//                 alertify.alert("Cannot perform the operation");
//                 return err
//
//               }
//             );
//           }
//           , err => {
//             if (err.response && err.response.status === 401) {
//               console.log(err.response.data["Error"]);
//               // localStorage.setItem("previous", window.location.hash);
//               // localStorage.removeItem("AccessToken");
//               // window.location = `#/login`;
//
//             } else {
//               alertify.alert("Cannot perform the operation");
//               return err
//             }
//           }
//         );
//
//
//       } else {
//         return err
//       }
//     }
//   );
//
// };

export const get = (url, params) => {

  return axios(base_url + url, {
    method: 'GET',
    headers: {
      'content-type': 'application/json', // whatever you want
      Authorization: "Bearer ".concat(localStorage.getItem("AccessToken"))
    },
    params: params

  })
    .then(res => {
        return res
      }
      , err => {
        if (err.response && err.response.status === 401) {
          let obj = {
            "refresh": localStorage.getItem("RefreshToken")
          }

          return axios(base_url + "/refresh/", {
            method: 'POST',
            headers: {
              'content-type': 'application/json', // whatever you want
              // Authorization: "Token ".concat(localStorage.getItem("RefreshToken"))
            },
            data: obj,
          }).then(res => {
              localStorage.setItem("AccessToken", res.data["access"]);
              return axios(base_url + url, {
                method: 'GET',
                headers: {
                  'content-type': 'application/json', // whatever you want
                  Authorization: "Bearer ".concat(localStorage.getItem("AccessToken"))
                },
                params: params
              }).then(res => {
                  return res
                }
                , err => {
                  alertify.alert("Cannot perform the operation");
                  return {}

                }
              );
            }
            , err => {
              if (err.response && err.response.status === 401) {
                console.log(err.response.data["Error"]);
                // localStorage.setItem("previous", window.location.hash);
                // localStorage.removeItem("Token");
                // window.location = `#/login`;

              } else {
                alertify.alert("Cannot perform the operation");
                return err
              }
            }
          );
        } else {
          alertify.alert("Cannot perform the operation");
          return err;
        }
      }
    );

};



