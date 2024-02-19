import ScaleLoader from "react-spinners/ScaleLoader";
export const Loading=(loading)=>{
    const override = {
    display: "block",
    margin: "50",
  };
    return <ScaleLoader color="var(--main-two)" cssOverride={override} />;
}