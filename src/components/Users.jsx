import React, { useState } from "react";
import { FaPen, FaTrash } from "react-icons/fa";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

const Users = () => {
  const loadedUsers = useLoaderData();
  const [users,setUsers] = useState(loadedUsers || []);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // delete from the database
        fetch(`https://coffee-store-server-seven-ashy.vercel.app/users/${id}`, {
          method: "DELETE",
        })
          .then(res => res.json())
          .then(data => {
            console.log(data);
            if (data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "User has been deleted.",
                icon: "success",
              });

              const remainingusers = users.filter(user=> user._id !== id);
              setUsers(remainingusers);
            }
          });
      }
    })
    .catch(err=>{
      console.log('ErroR: ',err);
    })
  };
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Email</th>
            <th>Creation Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {users.map((user, inx) => (
            <tr key={user._id}>
              <th>{inx + 1}</th>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.insertedAt || "N/A"}</td>
              <td className="space-x-2 flex flex-col md:flex-row gap-3">
                <button
                  onClick={() => handleDelete(user._id)}
                  className="btn btn-warning"
                >
                  <FaTrash />
                </button>
                <button className="btn btn-neutral">
                  <FaPen />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
