import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import './EditEmployeeProfile.css';

function EditEmployeeProfile() {
    const [employeeId, setEmployeeId] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [department, setDepartment] = useState("");
    const [birthDate, setBirthDate] = useState(null);
    const [title, setTitle] = useState("");
    const [dep_from_date, setDep_from_date] = useState(null);
    const [dep_to_date, setDep_to_date] = useState(null);
    const [title_from_date, setTitle_from_date] = useState(null);
    const [title_to_date, setTitle_to_date] = useState(null);

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
            setBirthDate(new Date(res.data.birth_date));
            setTitle(res.data.title);
            setDep_from_date(new Date (res.data.dep_from_date));
            setDep_to_date(new Date(res.data.dep_to_date));
            setTitle_from_date(new Date (res.data.title_from_date));
            setTitle_to_date(new Date (res.data.title_to_date));
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
    const handleBirthDateChange = (date) => {
        setBirthDate(date);
    };
    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };
    const handleDep_from_dateChange = (date) => {
        setDep_from_date(date);
    };
    const handleDep_to_dateChange = (date) => {
        setDep_to_date(date);
    };
    const handleTitle_from_dateChange = (date) => {
        setTitle_from_date(date);
    };
    const handleTitle_to_dateChange = (date) => {
        setTitle_to_date(date);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formatedDepFromDate = dep_from_date.toISOString().split('T')[0];
        const formatedDepToDate = dep_to_date.toISOString().split('T')[0];
        const formatedTitleFromDate = title_from_date.toISOString().split('T')[0];
        const formatedTitleToDate = title_to_date.toISOString().split('T')[0];
        const formatedBirthDate = birthDate.toISOString().split('T')[0];
        const response = await axios.put(`http://localhost:8080/api/editprofile/${employeeId}`, {
                firstName,
                lastName,
                department,
                birthDate : formatedBirthDate,
                title,
                dep_from_date: formatedDepFromDate,
                dep_to_date : formatedDepToDate,
                title_from_date : formatedTitleFromDate,
                title_to_date: formatedTitleToDate
                // add more fields as needed
        });
    
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
                From Date: 
                <DatePicker
                    selected={dep_from_date}
                    onChange={handleDep_from_dateChange}
                    dateFormat="yyyy-MM-dd"
                    className="calendar-style"
                />
                To Date:
                <DatePicker
                    selected={dep_to_date}
                    onChange={handleDep_to_dateChange}
                    dateFormat="yyyy-MM-dd"
                    className="calendar-style"
                />
            </label>
            <label>
                Birth Date:
                <DatePicker
                    selected={birthDate}
                    onChange={handleBirthDateChange}
                    dateFormat="yyyy-MM-dd"
                    className="calendar-style"
                />
            </label>
            <label>
                Title:
                <input type="text" value={title} onChange={handleTitleChange} />
                From Date: 
                <DatePicker
                    selected={title_from_date}
                    onChange={handleTitle_from_dateChange}
                    dateFormat="yyyy-MM-dd"
                    className="calendar-style"
                />
                To Date:
                <DatePicker
                    selected={title_to_date}
                    onChange={handleTitle_to_dateChange}
                    dateFormat="yyyy-MM-dd"
                    className="calendar-style"
                />
            </label>

            {/* add more fields as needed */}
            <button type="submit">Submit Changes</button>
        </form>
    );
}

export default EditEmployeeProfile;
