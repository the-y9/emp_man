import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table'

const data = [
    {"id": 1, "ename": "abc", "dept":"dept1", "designation": "post1", "tech_expertise": "level1"},
]

const dept = [
    {"id":1, "dname":"dept1"},
    {"id":2, "dname":"dept2"},
    {"id":3, "dname":"dept3"},
]


const designation = [
    {"id":1, "dename":"post1"},
    {"id":2, "dename":"post2"},
    {"id":3, "dename":"post3"},
]

const tech_expertise = [
    {"id":1, "level":"level1"},
    {"id":2, "level":"level2"},
    {"id":3, "level":"level3"},
]

// Function to get a random element from an array
const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

const data1 = Array.from({ length: 10 }, (_, index) => ({
    id: index + 1,
    ename: `Employee${index + 1}`,
    dept: getRandomElement(dept).dname,
    designation: getRandomElement(designation).dename,
    tech_expertise: getRandomElement(tech_expertise).level,
}));

function Display() {
    const [dpt, setDpt] = useState("");
    const [des, setDes] = useState("");
    // const [te, setTe] = useState("");

    const filteredData = data1.filter(d => {
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
                        {dept.map(d => <option key={d.id} value={d.dname}>{d.dname}</option>)}
                    </select>
                    
            </div>
            <div>
                <label>Designation : </label>
                <select className= 'select-box' onChange={(e) => setDes(e.target.value)} value = {des}>
                    <option value=""> Select Designation </option>
                    {designation.map(d=> <option key={d.id} value={d.dename}> {d.dename} </option>)}
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
        <Table striped bordered hover variant='dark'>
            <thead>
                <tr>
                    <th>Id</th><th>Name</th><th>Dept</th><th>Designation</th><th>Technical Expertise</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    {/* <td>0</td><td>dummy</td><td>dummyDept</td><td>dummyDes</td><td>None </td> */}
                </tr>
                {filteredData.map(d=> <tr key= {d.id}>
                    <td>{d.id}</td><td>{d.ename}</td><td>{d.dept}</td><td>{d.designation}</td><td>{d.tech_expertise}</td>
                </tr>)}
                
            </tbody>
            </Table>
        </div>
    </>)
}

export default Display;