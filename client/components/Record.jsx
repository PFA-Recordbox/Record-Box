import React from "react";

export default function Record({ website, userName, password}){
  return (
    <div className="eachRecord">
      <div className="eachRecordHeader">
        <p>Website:</p>
        <span>{website}</span>
      </div>
      <div className="eachRecordHeader">
        <p>Username:</p>
        <span>{userName}</span>
      </div>
      <div className="eachRecordHeader">
        <p>Password:</p>
        <span>{password}</span>
      </div>
    </div>
  )
}







