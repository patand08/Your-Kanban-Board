import React from "react";

export default function Label(props) {
  return (
    <div className="container max-w-fit">
      {props.label === "3" && (
        <div className="px-2 py-1 rounded-md bg-gradient-to-r from-red-700 to-red-300">
          <p className="text-sm font-bold text-gray-100">High</p>
        </div>
      )}
      {props.label === "2" && (
        <div className="px-2 py-1 rounded-md bg-gradient-to-r from-orange-400 to-yellow-500">
          <p className="text-sm font-bold text-gray-900">Mid</p>
        </div>
      )}
      {(props.label === "1" ||
        props.label === "0" ||
        props.label === "" ||
        props.label === 0 ||
        props.label === null) && (
        <div className="px-2 py-1 rounded-md bg-gradient-to-r from-indigo-400 to-blue-600">
          <p className="text-sm font-bold text-gray-100">Low</p>
        </div>
      )}
    </div>
  );
}
