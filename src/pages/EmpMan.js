import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { useStore } from '../store/data';


function Display() {
    const { store, setStore, delEmployee } = useStore();

    const [dpt, setDpt] = useState("");
    const [des, setDes] = useState("");
    const [search, setSearch] = useState("");
    // const [te, setTe] = useState("");

    const filteredData = store.data.filter(d => {
        return (
            (
            (dpt === "" || d.dept === dpt) &&
            (des === "" || d.designation === des || d.designation === search)
            )
        );
    });
    const clearFilter = () => {
        setDpt("");
        setDes("");
    }

    const ne = {"id": 11}
    const add =() => {
        setStore({...store, data: [...store.data, ne]})

    }
    
    return (<>
        <h1>Employee Master</h1>
        <Container>
            <Row>
                <Col>
                    <Row>
                        <div className="">
                            <label>Department : </label>
                            <select className='select-box' onChange={(e) => setDpt(e.target.value)} value={dpt}>
                                <option value="">Select Department</option>
                                {store.dept.map(d => <option key={d.id} value={d.dname}>{d.dname}</option>)}
                            </select>
                        </div>
                    </Row>
                    <br></br>
                    <Row>
                        <div>
                            <label>Designation : </label>
                            <select className= 'select-box' onChange={(e) => setDes(e.target.value)} value = {des}>
                                <option value=""> Select Designation </option>
                                {store.designation.map(d=> <option key={d.id} value={d.dename}> {d.dename} </option>)}
                            </select>
                        </div>
                    </Row>
                </Col>
                <Col>
                    <Row><div><Button variant="warning" onClick={clearFilter}>Clear</Button></div></Row>
                    <br></br>
                    <Row><div><Button variant='primary' onClick={add}>Add</Button></div></Row>
                </Col>
                <Col>
                    <input 
                    type='search' 
                    placeholder='Search Under Develop'
                    value={search}
                    onChange={(e)=>setSearch(e.target.value)}
                    ></input>
                    <br></br>
                    <h4>{search}</h4>
                </Col>
            </Row>
        </Container>
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