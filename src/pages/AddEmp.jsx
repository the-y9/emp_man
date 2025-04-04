import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import { useStore } from '../store/data';

function AddEmployeeModal() {
  const { store, setStore, } = useStore();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [nam, setNam ] = useState("")
  const [dpt, setDpt ] = useState("")
  const [des, setDes ] = useState("")
  const [te, setTe ] = useState("")

  const addEmployee = () => {
    const ne = {"id":store.data.length +1,
      "ename": nam,
      "dept": dpt, 
      "designation": des, 
      "tech_expertise": te}
    setStore({ ...store, data: [...store.data, ne]})
    clearInputs();
    setShow(false);
  }
  
  const clearInputs = () => {
    setNam("");
    setDpt("");
    setDes("");
    setTe("");
  };
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Employee
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form style={{ marginTop: "-3em" }}>
          
            <Form.Group className="mb-3" controlId="ename">
              <Form.Label>Employee Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name"
                value={nam}
                onChange={(e)=> setNam(e.target.value)}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="dept">
              <Form.Label>Employee Department</Form.Label>
              <Form.Select value={dpt} onChange={(e)=>setDpt(e.target.value)}>
                <option value="">Select</option>
                {store.dept.map(d => <option key={d.id} value={d.dname}>{d.dname}</option>)}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="des">
              <Form.Label>Employee Designation</Form.Label>
              <Form.Select value={des} onChange={(e)=>setDes(e.target.value)}>
                <option value="">Select</option>
                {store.designation.map(d => <option key={d.id} value={d.dename}>{d.dename}</option>)}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="te">
              <Form.Label>Technical Expertise</Form.Label>
              <Form.Select value={te} onChange={(e)=>setTe(e.target.value)}>
                <option value="">Select</option>
                {store.tech_expertise.map(d => <option key={d.id} value={d.level}>{d.level}</option>)}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer >
          <Button variant="warning" onClick={clearInputs}>
            Clear
          </Button>
          <Button variant="primary" onClick={addEmployee}>
            Add Employee
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddEmployeeModal;