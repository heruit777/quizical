import React from "react";

export default function Login(props) {
    const { updateShowLogin } = props;
    return (
        <div className="bg-white rounded-2xl flex flex-col shadow-2xl justify-center items-center w-full h-screen lg:rounded-lg lg:shadow-2xl lg:w-1/2">
            <h2 className="text-2xl font-bold">Quizzical</h2>
            <p className="mb-5">Some description if needed</p>
            <button className="bg-blue-500 text-white w-44 p-2 rounded-lg" onClick={() => updateShowLogin(false)}>Start quiz</button>
        </div>
    );
}