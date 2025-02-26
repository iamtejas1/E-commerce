import { useEffect, useState } from "react";

export const Users = () => {
  const [data, setData] = useState([]); // Initially set to an empty array

  useEffect(() => {
    // Fetch data from the API
    fetch("https://dummyjson.com/users")
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        setData(res.users); // `users` is the key in the API response
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, []); // Dependency array to ensure useEffect runs only once

  return (
    <div>
      <div className="container-fluid d-flex justify-content-center flex-wrap">
        {data.map((user,index) => (
          <div key={index} className="">
            <div className="card m-5 text-center py-4">
              <div className="card-img">
                <img src={user.image} alt={`${user.firstName}'s profile`} />
              </div>
              <div className="card-body fw-bold">
                <div>Id: {user.id}</div>
                <div>First Name: {user.firstName}</div>
                <div>Last Name: {user.lastName}</div>
                <div>Maiden Name: {user.maidenName}</div>
                <div>Age: {user.age}</div>
                <div>Gender: {user.gender}</div>
                <div>Email: {user.email}</div>
                <div>Phone: {user.phone}</div>
                <div>Birth Date: {user.birthDate}</div>
                <div>Blood Group: {user.bloodGroup}</div>
                <div>Eye Color: {user.eyeColor}</div>
                <div>Hair Color: {user.hair.color}</div>
                <div className="card-text">Hair Type: {user.hair.type}</div>
              </div>
              <div className="my-2">
                <button className="btn btn-success">View Profile</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
