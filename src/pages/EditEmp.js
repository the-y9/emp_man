import { useState } from "react";
import { Button } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import { Form } from "react-bootstrap";

import { useStore } from '../store/data';


export default function UpdateEmployeeModal({ data }){

    const [ show, setShow ] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const {store, setStore } = useStore();

    const [nam, setNam ] = useState(data.ename)
    const [dpt, setDpt ] = useState(data.dept)
    const [des, setDes ] = useState(data.designation)
    const [te, setTe ] = useState(data.tech_expertise)

    const clearInputs = () => {
        setNam("");
        setDpt("");
        setDes("");
        setTe("");
    };

    const updEmployee = () => {
        const updatedData = {
            "id": data.id,
            "ename": nam,
            "dept": dpt,
            "designation": des,
            "tech_expertise": te
        }

        setStore(prevStore => ({
            ...prevStore,
            data: prevStore.data.map(emp => emp.id === data.id ? updatedData : emp)
        }));

        console.log(updatedData);
        handleClose();
    }

    return(<>
    <Button variant="success" onClick={() => {handleShow(); console.log(data);}}>Update</Button>

    <Modal show={show} onHide={handleClose} >
        <Modal.Header closeButton>
            <Modal.Title>Update Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form style={{ marginTop: "-3em" }}>

            <Form.Group className="">
                <Form.Label>Id</Form.Label>
                <Form.Control placeholder={data.id} disabled />
            </Form.Group>

            <Form.Group className="" controlId="ename">
              <Form.Label>Employee Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name"
                value={nam}
                onChange={(e)=> setNam(e.target.value)}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="" controlId="dept">
              <Form.Label>Employee Department</Form.Label>
              <Form.Select value={dpt} onChange={(e)=>setDpt(e.target.value)}>
                <option value="">Select</option>
                {store.dept.map(d => <option key={d.id} value={d.dname}>{d.dname}</option>)}
              </Form.Select>
            </Form.Group>
            <Form.Group className="" controlId="des">
              <Form.Label>Employee Designation</Form.Label>
              <Form.Select value={des} onChange={(e)=>setDes(e.target.value)}>
                <option value="">Select</option>
                {store.designation.map(d => <option key={d.id} value={d.dename}>{d.dename}</option>)}
              </Form.Select>
            </Form.Group>
            <Form.Group className="" controlId="te">
              <Form.Label>Technical Expertise</Form.Label>
              <Form.Select value={te} onChange={(e)=>setTe(e.target.value)}>
                <option value="">Select</option>
                {store.tech_expertise.map(d => <option key={d.id} value={d.level}>{d.level}</option>)}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        
        <Modal.Footer style={{ marginTop: "-1px" }}>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="success" onClick={updEmployee}>
            Update Employee
          </Button>
        </Modal.Footer>
    </Modal>
    </>)
}