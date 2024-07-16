import React from "react";
import logo from "../../assets/kiwi.jpg";
import { Link } from "react-router-dom";
import "./Login.css";
import LoginInput from "../../Components/LoginInput/LoginInput";
import { useRecoilState } from "recoil";
import { GetAccessAtom } from "../../Recoil/GetAccessAtom";

const Login = () => {
  const [access, setAccess] = useRecoilState(GetAccessAtom);

  return (
    <div className="flex justify-center items-center h-screen gradient-background  ">
      {/* 화면 가운데 정렬 */}
      <div className="card bg-base-100 shadow-xl shadow-black w-96 h-fit p-10">
        <figure className="p-10">
          <img src={logo} alt="NZPG Logo" className="w-full h-fit" />
        </figure>
        <div className="card-body items-center text-center  ">
          <h1 className="text-3xl font-bold text-center mb-10 ">Welcome! </h1>
          <LoginInput placeholder={"EMAIL"} />
          <LoginInput placeholder={"PASSWORD"} />
          <Link to="/select_location" className="w-full rounded-2xl">
            <button className="btn btn-info w-4/5 rounded-3xl shadow-2xl text-white border-blue-500 ">
              LOGIN
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
