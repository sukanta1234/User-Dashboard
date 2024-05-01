import axios from "axios";

const adminURL="https://wtsacademy.dedicateddevelopers.us/api"
export const baseURL=adminURL;
const axiosInstance=axios.create({
    baseURL
})
export {adminURL}


export const profile_pic=(media)=>{
    return `https://wtsacademy.dedicateddevelopers.us/uploads/user/profile_pic/${media}`
}
export const product = (media) => {
  return `https://wtsacademy.dedicateddevelopers.us/uploads/product/${media}`;
};

axiosInstance.interceptors.request.use(
    async function(config){
      const token = localStorage.getItem('token') || sessionStorage.getItem("token")
      if (token) {
        config.headers["x-access-token"]=token;
      }
      return config;
    },
    function(error){
      return Promise.reject(error);
    }
  );
  
  
  
  export default axiosInstance;