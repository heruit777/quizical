import React from "react";

export default function Alert(props) {
    const { msg } = props;

    return (
        <div className="w-full bg-red-200 absolute text-center py-2 top-0">
            <p className="text-2xl text-red-600 ">{msg}</p>
        </div>
    );
}