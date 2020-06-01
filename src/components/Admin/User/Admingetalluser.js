import React from 'react'

const Admingetalluser = () => {
    return (
        <div class="card">
            <button onClick="location.href='./QUANLYNV/ADD'" id="addnewlist" type="button" class="btn btn-success position-absolute" data-toggle="modal" data-target=".bd-example-modal-lg"><a class="fas fa-plus"  ></a> Add a new List</button>
            <table class="table table-hover" style={{marginTop:"50px"}}>
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Full Name</th>
                        <th scope="col">BirthDay</th>
                        <th scope="col">Address</th>
                        <th scope="col">Phone </th>
                        <th scope="col">Salary</th>

                    </tr>
                </thead>
                <tbody>

                    <tr>
                       
                        <th scope="row" id="IDBIXOA">ID</th>
                        <td>asd</td>
                        <td>asd</td>
                        <td>asd</td>
                        <td>asd</td>


                        <td>100000</td>

                        <td>
                            <a class="btn btn-sm btn-primary" href="QUANLYNV/UPDATE/{{Employee.id}}"><i class="far fa-edit"></i> edit</a>
                            <a id="btn-employee-delete" class="btn btn-sm btn-danger" ><i class="fas fa-trash-alt"></i> delete</a>
                        </td>


                    </tr>
                




            </tbody>

            </table>

        </div>
    )
}
export default Admingetalluser;