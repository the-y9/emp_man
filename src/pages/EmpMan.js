import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table'
import { useStore } from '../store/data';


function Display() {
    const { store, delEmployee } = useStore();

    const [dpt, setDpt] = useState("");
    const [des, setDes] = useState("");
    // const [te, setTe] = useState("");

    const filteredData = store.data.filter(d => {
        return (
            (dpt === "" || d.dept === dpt) &&
            (des === "" || d.designation === des)
        );
    });
    const clearFilter = () => {
        setDpt("");
        setDes("");
    }


    
    return (<>
        <h1>Employee Master</h1>
        <div className='hcontainer'>
        <div className='vcontainer'>
            <div className="">
                    <label>Department : </label>
                    <select className='select-box' onChange={(e) => setDpt(e.target.value)} value={dpt}>
                        <option value="">Select Department</option>
                        {store.dept.map(d => <option key={d.id} value={d.dname}>{d.dname}</option>)}
                    </select>
                    
            </div>
            <div>
                <label>Designation : </label>
                <select className= 'select-box' onChange={(e) => setDes(e.target.value)} value = {des}>
                    <option value=""> Select Designation </option>
                    {store.designation.map(d=> <option key={d.id} value={d.dename}> {d.dename} </option>)}
                </select>
            </div>
        </div>

        <Button variant="danger" onClick={clearFilter}>
            Clear
        </Button>
        </div>
{/*         
        <div className="selected-filters">
                <h2>Selected Filters:</h2>
                <p>Department: {dpt || "None"}</p>
                <p>Designation: {des || "None"}</p>
        </div> */}

        <div>
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
                    <td><Button variant="danger" onClick={() => delEmployee(d.id)}>Delete</Button></td>
                </tr>)}
                
            </tbody>
            </Table>
        </div>
    </>)
}

export default Display;