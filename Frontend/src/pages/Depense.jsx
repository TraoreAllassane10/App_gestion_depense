import React, { useContext } from "react";
import { AuthContext } from "../context/authContext";
import useAuth from "../hooks/useAuth";

const Depense = () => {
  const { user } = useContext(AuthContext);

  const {logout} = useAuth()

  return (
    <div className="max-w-7xl mx-auto my-20">
      <div className="flex justify-end">
        <button onClick={logout} className="btn btn-warning my-4" >Deconnexion</button>
      </div>

      <div className="card  text-neutral-content border-2 border-warning/10 bg-warning/5 p-5">
        <button className="btn btn-warning w-full mb-6">
          Ajouter une depense
        </button>

        <table className="table w-fll">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Date</th>
              <th>Decription</th>
              <th>Montant</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr>
              <th>1</th>
              <td>Cy Ganderton</td>
              <td>Quality Control Specialist</td>
              <td>Blue</td>
            </tr>
            {/* row 2 */}
            <tr>
              <th>2</th>
              <td>Hart Hagerty</td>
              <td>Desktop Support Technician</td>
              <td>Purple</td>
            </tr>
            {/* row 3 */}
            <tr>
              <th>3</th>
              <td>Brice Swyre</td>
              <td>Tax Accountant</td>
              <td>Red</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Depense;
