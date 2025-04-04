import { Table } from "react-bootstrap"
import { Button } from "react-bootstrap"

import { useStore } from "../store/data";
import UpEmp from './EditEmp'

export default function EmployeeTable( { filteredData } ){
    const { store, delEmployee } = useStore();

    const log = () => {
        [...filteredData.keys()].map(i => console.log(i));
    }

    return (<>
            <Button onClick={() => log()}>Log Data</Button>

        <Table striped bordered hover variant='dark' size='sm'>
        <thead>
            <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Dept</th>
                <th>Designation</th>
                <th>Technical Expertise</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                {/* <td>0</td><td>dummy</td><td>dummyDept</td><td>dummyDes</td><td>None </td> */}
            </tr>
            {filteredData.map(d=> <tr key= {d.id}>
                <td>{d.id}</td>
                <td>{d.ename}</td>
                <td>{d.dept}</td>
                <td>{d.designation}</td>
                <td>{d.tech_expertise}</td>
                <td className="d-flex gap-2 mb-2"><Button variant="danger" onClick={() => delEmployee(d.id)}>Delete</Button>
                    <UpEmp data={ d } />
                </td>

            </tr>)}
            
        </tbody>
        </Table>
    </>)

}