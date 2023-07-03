import { BallTriangle } from "react-loader-spinner";
export default function Loader() {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "30rem" }}
    >
      <BallTriangle
        height={100}
        width={100}
        radius={5}
        color="#ffaf00"
        ariaLabel="ball-triangle-loading"
        wrapperClass={{}}
        wrapperStyle=""
        visible={true}
      />
    </div>
  );
}
