import React, { useEffect, useState } from "react";
import DashBoardContent from "../../../Components/layout/DashBoardContent";
import { collection, onSnapshot, query } from "firebase/firestore";
import { auth, db } from "../../../firebase-app/firebaseconfig";
import slugify from "slugify";
import Remove from "../../../Components/actions/Remove";
import Edit from "../../../Components/actions/Edit";
import CardUser from "../../../Components/Card/CardUser";
import { NavLink, useNavigate } from "react-router-dom";
import { deleteUser } from "firebase/auth";
import { Button } from "react-bootstrap";

const ManageUsers = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  useEffect(() => {
    function getUser() {
      const q = query(collection(db, "users"));
      onSnapshot(q, (querySnapshot) => {
        const Data = [];
        querySnapshot.forEach((doc) => {
          Data.push(doc.data());
        });
        setUser(Data);
      });
    }
    getUser();
  }, []);

  const handleEdit = (id) => {
    navigate(`/manage/update-users?id=${id}`);
  };
  return (
    <>
      <div className="flex justify-between items-end">
        <div>
          <DashBoardContent>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
              />
            </svg>
            <h1>Users</h1>
          </DashBoardContent>
          <span className="text-gray-400 text-lg mt-5">Manage your users</span>
        </div>
        <NavLink
          to="/manage/add-users"
          className="bg-blue-500 text-white font-bold px-5 text-xl h-[50px] rounded-lg
           capitalize flex items-center gap-x-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
            />
          </svg>
          Create New Users
        </NavLink>
      </div>

      <div>
        <table className="w-full mt-5 rounded-xl overflow-hidden bg-gray-50">
          <thead className="h-[50px] ">
            <tr>
              <th
                scope="col"
                className=" bg-slate-300 font-bold  text-left px-5 text-lg text-gray-500 uppercase w-1/12"
              >
                ID
              </th>
              <th
                scope="col"
                className=" bg-slate-300 font-bold   text-left px-5 text-lg text-gray-500 uppercase w-1/5"
              >
                infor
              </th>
              <th
                className=" bg-slate-300 font-bold  text-left px-5 text-lg text-gray-500 uppercase w-1/5"
                scope="col"
              >
                username
              </th>
              <th
                scope="col"
                className=" bg-slate-300 font-bold  text-left px-5 text-lg text-gray-500 uppercase w-1/5"
              >
                Email address
              </th>
              <th
                scope="col"
                className=" bg-slate-300 font-bold  text-left px-5 text-lg text-gray-500 uppercase w-1/5"
              >
                role
              </th>
              <th
                scope="col"
                className=" bg-slate-300 font-bold  text-left px-5 text-lg text-gray-500 uppercase w-1/5"
              >
                status
              </th>
              <th
                scope="col"
                className=" bg-slate-300 font-bold  text-left px-5 text-lg text-gray-500 uppercase w-1/5"
              >
                actions
              </th>
            </tr>
          </thead>
          <tbody>
            {user.length > 0 &&
              user.map((item, index) => {
                return (
                  <tr className="text-gray-800 font-bold" key={item.id}>
                    <td className="px-5 py-2">{item.id.slice(0, 5) + "..."}</td>
                    <td className="px-5 py-2">
                      <CardUser
                        name={item.fullname}
                        url_image={item.url_image}
                      ></CardUser>
                    </td>
                    <td className="px-5 py-2">
                      {slugify(item.username || item.fullname, { lower: true })}
                    </td>
                    <td className="px-5 py-2">{item.email}</td>
                    <td className="px-5 py-2 capitalize">
                      {item.role === "user" && (
                        <Button className="bg-blue-400 text-white w-[100px] py-3 rounded-lg capitalize">
                          {item.role}
                        </Button>
                      )}
                      {item.role === "admin" && (
                        <Button className="bg-green-200 text-red-800 w-[100px] py-3 rounded-lg capitalize">
                          {item.role}
                        </Button>
                      )}
                    </td>
                    <td className="px-5 py-2 capitalize">{item.status}</td>
                    <td className="px-5 py-2 flex  gap-x-5">
                      <Edit onClick={() => handleEdit(item.id)}></Edit>
                      <Remove></Remove>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ManageUsers;
