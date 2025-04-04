import { Table, Button } from "react-bootstrap";

export default function GenericTable({ colHeaders, data, renderActions, variant }) {
    
    return (<>
        <Table striped bordered hover variant={variant} size='sm'>
            <thead>
                <tr>
                    {colHeaders.map((col, index) => (
                        <th key={index}>{col}</th>
                    ))}
                    {renderActions && (<th>Actions</th>)}
                </tr>
            </thead>
            <tbody>
                {data.map((item) => (
                    <tr key={item.id}>
                        {colHeaders.map((col, idx) => (
                            <td key={idx}>{item[col]}</td> 
                        ))}


                        {renderActions && (
                            <td className="d-flex gap-2">
                                {renderActions(item)}
                            </td>
                        )}
                    </tr>
                ))}
            </tbody>
        </Table>
        </>);
}
