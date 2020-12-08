import React from 'react'
import {Table, Button} from "react-bootstrap";

class TableComponent extends React.Component {

    render() {

        const {todos, deleteItem} = this.props

        return <Table striped bordered hover>
            <thead>
            <tr>
                <th>First Name</th>
                <th>Email</th>
                <th>password</th>
                <th>phone</th>
                <th>status</th>
            </tr>
            </thead>

            <tbody>

                {todos && todos.map(item => {
                    return (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.password}</td>
                            <td>{item.phone}</td>
                            <td>{item.status}</td>

                            <td>
                                <Button
                                    variant="danger"
                                    onClick={() => deleteItem(item.id)}
                                >Delete</Button>
                            </td>
                        </tr>
                    )
                })}

            </tbody>
        </Table>
    }
}

export default  TableComponent
