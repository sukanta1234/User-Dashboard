import React from "react";
import { DNA } from "react-loader-spinner";

const Loading = () => {
  return (
    <div style={{display:"flex",justifyContent:"center",marginTop:"100px"}}>
      <DNA
  visible={true}
  height="80"
  width="80"
  ariaLabel="dna-loading"
  wrapperStyle={{}}
  wrapperClass="dna-wrapper"
  />
    </div>
  );
};

export default Loading;
