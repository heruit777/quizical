import React from "react";
import Login from "./components/Login";
import FormQuiz from "./components/FormQuiz"

export default function App() {
    const [showLogin, setShowLogin] = React.useState(true); // decides when to showLogin

    function updateShowLogin(boolState) {
        setShowLogin(boolState);
    }

    return (
        <div className="bg-purple-100 flex justify-center items-center font-['Karla'] w-screen min-h-screen">

            {showLogin ? <Login updateShowLogin={updateShowLogin} /> : <FormQuiz updateShowLogin={updateShowLogin} />}
        </div>
    );
}