import React, { useState } from "react";
import { Modal, Button, Form, Table } from "react-bootstrap";
import { useStore } from "../store/data";
import GenericTable from "./GenericTable";

export default function AdminManageModal() {
    const { store, setStore } = useStore();

    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    // State for tracking category and new input
    const [selectedCategory, setSelectedCategory] = useState("dept");
    const [newItem, setNewItem] = useState("");

    // Handle adding a new entry
    const addItem = () => {
        if (!newItem.trim()) return;

        const newId = store[selectedCategory].length + 1;
        const newEntry =
            selectedCategory === "dept"
                ? { id: newId, dname: newItem }
                : selectedCategory === "designation"
                ? { id: newId, dename: newItem }
                : { id: newId, level: newItem };

        setStore((prevStore) => ({
            ...prevStore,
            [selectedCategory]: [...prevStore[selectedCategory], newEntry],
        }));

        setNewItem("");
    };

    // Handle deleting an entry
    const deleteItem = (id) => {
        setStore((prevStore) => ({
            ...prevStore,
            [selectedCategory]: prevStore[selectedCategory].filter((item) => item.id !== id),
        }));
    };

    const headers = store[selectedCategory].length > 0 
        ? Object.keys(store[selectedCategory][0]) 
        : ["id", "name"];


    return (<>
        {/* <Button variant="secondary">Admin Manage</Button> */}
        
      <Button variant="secondary" onClick={handleShow}>
        Admin Manage
      </Button>        


        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Admin Management</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group>
                    <Form.Label>Select Category</Form.Label>
                    <Form.Select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                        <option value="dept">Department</option>
                        <option value="designation">Designation</option>
                        <option value="tech_expertise">Technical Expertise</option>
                    </Form.Select>
                </Form.Group>

                <GenericTable 
                colHeaders={headers} 
                data={store[selectedCategory]}  
                renderActions={(item)=>(
                    <Button variant="danger" size="sm" onClick={() => deleteItem(item.id)}>Delete</Button>
                )}
                />

                <Form.Group className="mt-3">
                    <Form.Label>Add New</Form.Label>
                    <Form.Control
                        type="text"
                        value={newItem}
                        onChange={(e) => setNewItem(e.target.value)}
                        placeholder="Enter new item"
                    />
                </Form.Group>

                <Button variant="primary" className="mt-2" onClick={addItem}>
                    Add
                </Button>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
        </>);
}
