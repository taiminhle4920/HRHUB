import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';

function EditEmployeeProfile() {
    const [employeeId, setEmployeeId] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [department, setDepartment] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [title, setTitle] = useState("");
    const [dep_from_date, setDep_from_date] = useState("");
    const [dep_to_date, setDep_to_date] = useState("");
    const [title_from_date, setTitle_from_date] = useState("");
    const [title_to_date, setTitle_to_date] = useState("");

    // add more fields as needed
    const { id } = useParams();
    console.log(id);
    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        return await axios.get(`http://localhost:8080/api/getemployeedata/${id}`, {withCredentials: true}).then((res) => {
            console.log(res.data);
            setEmployeeId(res.data.emp_no);
            setFirstName(res.data.first_name);
            setLastName(res.data.last_name);
            setDepartment(res.data.department);
            setBirthDate(res.data.birth_date);
            setTitle(res.data.title);
            setDep_from_date(res.data.dep_from_date);
            setDep_to_date(res.data.dep_to_date);
            setTitle_from_date(res.data.title_from_date);
            setTitle_to_date(res.data.title_to_date);
        });
    };

    const handleEmployeeIdChange = (event) => {
        setEmployeeId(event.target.value);
    };

    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
    };

    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
    };
    const handleDepartmentChange = (event) => {
        setDepartment(event.target.value);
    };
    const handleBirthDateChange = (event) => {
        setBirthDate(event.target.value);
    };
    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };
    const handleDep_from_dateChange = (event) => {
        setDep_from_date(event.target.value);
    };
    const handleDep_to_dateChange = (event) => {
        setDep_to_date(event.target.value);
    };
    const handleTitle_from_dateChange = (event) => {
        setTitle_from_date(event.target.value);
    };
    const handleTitle_to_dateChange = (event) => {
        setTitle_to_date(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch(`/api/editprofile/${employeeId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                firstName,
                lastName,
                department,
                birthDate,
                title,
                dep_from_date,
                dep_to_date,
                title_from_date,
                title_to_date
                // add more fields as needed
            }),
        });
        const data = await response.json();
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit} className="edit-employee-form">
            <label>
                Employee ID:
                <input
                    type="text"
                    value={employeeId}
                    onChange={handleEmployeeIdChange}
                />
            </label>
            <label>
                First Name:
                <input
                    type="text"
                    value={firstName}
                    onChange={handleFirstNameChange}
                />
            </label>
            <label>
                Last Name:
                <input type="text" value={lastName} onChange={handleLastNameChange} />
            </label>
            <label>
                Department:
                <input
                    type="text"
                    value={department}
                    onChange={handleDepartmentChange}
                />
                <input
                    type="text"
                    value={dep_from_date}
                    onChange={handleDep_from_dateChange}
                />
                <input
                    type="text"
                    value={dep_to_date}
                    onChange={handleDep_to_dateChange}
                />
            </label>
            <label>
                Birth Date:
                <input
                    type="text"
                    value={birthDate}
                    onChange={handleBirthDateChange}
                />
            </label>
            <label>
                Title:
                <input type="text" value={title} onChange={handleTitleChange} />
                <input
                    type="text"
                    value={title_from_date}
                    onChange={handleTitle_from_dateChange}
                />
                <input
                    type="text"
                    value={title_to_date}
                    onChange={handleTitle_to_dateChange}
                />
            </label>

            {/* add more fields as needed */}
            <button type="submit">Submit Changes</button>
        </form>
    );
}

export default EditEmployeeProfile;
