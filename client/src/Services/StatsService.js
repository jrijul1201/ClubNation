export default {
    getStats: () => {
      return fetch("/stat/stats").then((response,err) => {
        if (!err) {
          return response.json().then((data) => data);
        } else return { message: { msgBody: "UnAuthorized", msgError: true } };
      });
    }, 
  };