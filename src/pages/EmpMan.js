import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FormControl, InputGroup } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';  



import { useStore } from '../store/data';
import EmployeeTable from './EmpTable';
import AddEmp from './AddEmp'
import AdminManageModal from './AdminMan';
import GenericTable from './GenericTable';
import UpEmp from './EditEmp'


// const columns =;


function Display() {
    const { store, delEmployee } = useStore();

    const [dpt, setDpt] = useState("");
    const [des, setDes] = useState("");
    const [search, setSearch] = useState("");
    // const [te, setTe] = useState("");

    const filteredData = store.data.filter(d => {

        // const searchData = (search === "" || d.ename === search)
        const searchData = (search === "" 
            || d.id.toString().includes(search.toLowerCase()) 
            || d.ename.toLowerCase().includes(search.toLowerCase()) 
            || d.dept.toLowerCase().includes(search.toLowerCase()) 
            || d.designation.toLowerCase().includes(search.toLowerCase()) 
            || d.tech_expertise.toLowerCase().includes(search.toLowerCase()) 
                            );


        const filterData = (
            (dpt === "" || d.dept === dpt) &&
            (des === "" || d.designation === des)
        );
        return filterData && searchData
    });
    const clearFilter = () => {
        setDpt("");
        setDes("");
    }

    const renderCustomActions = (item) => {
        return (
            <>
                <Button variant="danger" onClick={() => delEmployee(item.id)}>Delete</Button>
                <UpEmp data={ item } />
            </>
        );
    }

    return (<>
        <h1>Employee Master</h1> 
        <Container>
            <Row>
                <Col md={6}>
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
                <Col md={2}>
                    <Row><div><Button variant="warning" onClick={clearFilter}>Clear Filters</Button></div></Row>
                    <br></br>
                    <Row><div><AddEmp /></div></Row>
                </Col>
                <Col md={1}></Col>
                <Col md={3}>
                {/* <Button variant="secondary">Admin Manage</Button> */}
                <AdminManageModal />
                    <InputGroup>
                        <InputGroup.Text>
                        <Icon.Search />
                        </InputGroup.Text>
                        <FormControl
                        type="search"
                        placeholder="Search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        />
                    </InputGroup>
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
            {/* <EmployeeTable filteredData={filteredData} /> */}
            <GenericTable 
            colHeaders= {['id', 'ename', 'dept', 'designation', 'tech_expertise']}
            data={filteredData} 
            renderActions={renderCustomActions}
            variant='dark'
        />
        </div>
    </>)
}

export default Display;