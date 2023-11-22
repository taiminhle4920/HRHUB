import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import './AddEmployee.css';
function AddEmployee() {
    const [employeeId, setEmployeeId] = useState("");
    const [birth_date, setBirth_date] = useState(null);
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [gender, setGender] = useState("");

    const [title, setTitle] = useState("");
    const [from_date, set_from_date] = useState(null);
    const [to_date, set_to_date] = useState(null);
    const [dep_no, setDep_no] = useState("");
    const [dep_name, setDep_name] = useState("");
    const [role, setRole] = useState("");   



    const handleEmployeeIdChange = (event) => {
        setEmployeeId(event.target.value);
    };
    const handleBirth_dateChange = (date) => {
        setBirth_date(date);
    };
    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
    };
    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
    };
    const handleGenderChange = (event) => {
        setGender(event.target.value);
    };

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };
    const handle_from_dateChange = (date) => {
        set_from_date(date);
    };
    const handle_to_dateChange = (date) => {
        set_to_date(date);
    };
    const handleDep_noChange = (event) => {
        setDep_no(event.target.value);
    };
    const handleDep_nameChange = (event) => {
        setDep_name(event.target.value);
    };
    const handleRoleChange = (event) => {
        setRole(event.target.value);
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await axios.post('http://localhost:8080/api/addemployee', {
            employeeId,
            birth_date,
            first_name,
            last_name,
            gender,

            title,
            from_date,
            to_date,
            dep_no,
            dep_name,
            role,
        });
        console.log(response);
        setEmployeeId("");
        setBirth_date("");
        setFirstName("");
        setLastName("");
        setGender("");
        setTitle("");
        set_from_date("");
        set_to_date("");
        setDep_no("");
        setDep_name("");
        setRole("");
    };

    return (
        <form onSubmit={handleSubmit} className="add-employee-form">
            <div class="form-row">
                <div class="row">
                    <div class="form-group col-md-4">
                        <label>
                            Employee ID:
                            <input
                                type="text"
                                value={employeeId}
                                onChange={handleEmployeeIdChange}
                            />
                        </label>
                    </div>
                    <div class="form-group col-md-4">
                        <label>
                            First Name:
                            <input
                                type="text"
                                value={first_name}
                                onChange={handleFirstNameChange}
                            />
                        </label>
                    </div>
                    <div class="form-group col-md-4">
                        <label>
                            Last Name:
                            <input type="text" value={last_name} onChange={handleLastNameChange} />
                        </label>
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-md-6">
                        <label>
                            Date of Birth:
                            <DatePicker
                                selected={birth_date}
                                onChange={handleBirth_dateChange}
                                dateFormat="yyyy-MM-dd"
                                className="calendar-style"
                            />
                        </label>
                    </div>
                    <div class="form-group col-md-6">
                        <label>
                            Gender:
                            <select value={gender} onChange={handleGenderChange}>
                                <option value="M">M</option>
                                <option value="F">F</option>
                                <option value="B">B</option>
                            </select>
                        </label>
                    </div>
                </div>
                <label>
                    Department:
                    <input
                        type="text"
                        value={dep_no}
                        onChange={handleDep_noChange}
                    />
                    Department Name (optional - to create new department):
                    <input
                        type="text"
                        value={dep_name}
                        onChange={handleDep_nameChange}
                    />
                </label>

                <label>
                    Title:
                    <input type="text" value={title} onChange={handleTitleChange} />
                </label>
                <label>
                    From Date:
                    <DatePicker
                        selected={from_date}
                        onChange={handle_from_dateChange}
                        dateFormat="yyyy-MM-dd"
                        className="calendar-style"
                    />
                </label>
                <label>
                    To Date:
                    <DatePicker
                        selected={to_date}
                        onChange={handle_to_dateChange}
                        dateFormat="yyyy-MM-dd"
                        className="calendar-style"
                    />
                </label>
                <label>
                    Role:
                    <select value={role} onChange={handleRoleChange}>
                        <option value="employee">Employee</option>
                        <option value="manager">Manager</option>
                    </select>
                </label>
                {/* add more fields as needed */}
                <button type="submit">Submit Changes</button>
            </div>
        </form>
    );
}

export default AddEmployee;
