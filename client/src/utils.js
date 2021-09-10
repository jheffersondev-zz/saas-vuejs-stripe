import jwt_decode from "jwt-decode";

function isTokenExpired() {
  try{
    let token = localStorage.getItem("userToken").toString();
    token = jwt_decode(token);

    return (Math.floor((new Date).getTime() / 1000)) >= token.exp;
  } catch(e){
    console.log(e)
    return true
  }
}

export {
  isTokenExpired
}