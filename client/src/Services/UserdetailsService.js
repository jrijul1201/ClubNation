export default {
    getUserdetails: () => {
      return fetch("/userdetail/userdetails").then((response) => {
        if (response.status !== 401) {
          return response.json().then((data) => data);
        } else return { message: { msgBody: "UnAuthorized", msgError: true } };
      });
    }, 
  };
  