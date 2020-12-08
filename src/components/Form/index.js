import React from 'react'
import {Button, Form} from "react-bootstrap";

class FormComponent extends React.Component {

    render() {

        const {
            currentEmail,
            currentName,
            currentPassword,
            searchValue,
            handleChange,
            onSubmitDate,
            getSearchUser,
            currentPhoneNumber,
            currentStatus,
            getSearchStatus,
            searchValueStatus,
            isValid,
            setIsValid
        } = this.props

        return (
            <>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            value={currentEmail}
                            type="email"
                            placeholder="Enter email"
                            onChange={(e) => handleChange("currentEmail", e)}
                            onBlur={() => setIsValid("currentEmail")}
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>User name</Form.Label>
                        <Form.Control
                            value={currentName}
                            type="text"
                            placeholder="Enter name"
                            onBlur={() => setIsValid("currentName")}
                            onChange={(e) => handleChange("currentName", e)}
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            value={currentPassword}
                            type="password"
                            placeholder="Password"
                            onBlur={() => setIsValid("currentPassword")}
                            onChange={(e) => handleChange("currentPassword", e)}
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>PhoneNumber</Form.Label>
                        <Form.Control
                            value={currentPhoneNumber}
                            type="number"
                            placeholder="number"
                            onBlur={() => setIsValid("currentPhoneNumber")}
                            onChange={(e) => handleChange("currentPhoneNumber", e)}
                        />
                    </Form.Group>

                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Status</Form.Label>
                        <Form.Control
                            value={currentStatus}
                            as="select"
                            onChange={e => handleChange("currentStatus", e)}
                        >
                            <option>none status</option>
                            <option>client</option>
                            <option>partner</option>
                            <option>admin</option>
                        </Form.Control>
                    </Form.Group>

                    <Button
                        variant="primary"
                        type="button"
                        disabled={isValid ? false : true}
                        onClick={() => onSubmitDate("currentName", "currentEmail", "currentPassword", "currentPhoneNumber", "currentStatus")}
                    >
                        Submit
                    </Button>

                    {!isValid ?
                        <Form.Text id="passwordHelpBlock" muted>
                            <span style={{color: "red"}} >Пожалуйста, заполните все поля ввода для создания заметки</span>
                        </Form.Text>
                        :
                        null
                    }
                </Form>

                <div style={{width: "60%", marginTop: 20}}>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Search for name</Form.Label>
                    <Form.Control
                        value={searchValue}
                        type="text"
                        placeholder="enter a name"
                        onChange={(e) => getSearchUser(e)}
                    />
                </Form.Group>

                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Search status</Form.Label>
                        <Form.Control
                            value={searchValueStatus}
                            as="select"
                            onChange={e => getSearchStatus(e)}
                        >
                            <option>clear filter</option>
                            <option>client</option>
                            <option>partner</option>
                            <option>admin</option>
                        </Form.Control>
                    </Form.Group>

                </div>
            </>
        )
    }
}

export default  FormComponent
