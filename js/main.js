
class ErrorResponse extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

 export default function request(url, options) {
   return new Promise(async (resolve, reject) => {
     let res = await fetch(url, options);
     if (res.ok === false) {
       reject(new ErrorResponse(res.status, res.statusText));
     }
     let data = await res.json();
     resolve(data);
   });
 }
