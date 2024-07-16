import React from "react";
import { useRecoilState } from "recoil";
import { LoginAtom } from "../../Recoil/LoginAtom";

const LoginInput = ({ placeholder }) => {
  const [userLogin, setUserLogin] = useRecoilState(LoginAtom);
  const handleOnChange = (e) => {
    setUserLogin((preUserLogin) => ({
      ...preUserLogin,
      [placeholder]: e.target.value,
    }));
    console.log(userLogin);
  };
  return (
    <label className="input input-bordered flex items-center gap-2 w-full  shadow-2xl  mb-4 p-7 border-gray-100">
      <input
        type="text"
        className="grow "
        placeholder={placeholder}
        onChange={handleOnChange}
      />
    </label>
  );
};

export default LoginInput;
