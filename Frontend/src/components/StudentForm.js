import React, { useEffect, useState } from 'react';
import { Container, Paper, Button, TextField } from '@mui/material';
import { Typography } from '@mui/material';

export default function StudentForm() {
    const paperStyle = { padding: '50px 20px', width: 600, margin: "20px auto" }
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [students, setStudents] = useState([])
    const [errors, setErrors] = useState({ name: false, address: false });
    const [errorMessages, setErrorMessages] = useState({ name: '', address: '' });

    useEffect(() => {
        fetchStudents();
    }, [])

    const fetchStudents = () => {
        fetch("http://localhost:8080/student/getAll")
            .then(res => res.json())
            .then((result) => {
                setStudents(result);
            })
    }

    const resetState = () => {
        setName('');
        setAddress('');
        setErrors({
            name: false,
            address: false
        });
        setErrorMessages({
            name: "",
            address: ""
        });
    }

    const validateInputs = () => {
        const isNameEmpty = name.length === 0;
        const isAddressEmpty = address.length === 0;

        setErrors({
            name: isNameEmpty,
            address: isAddressEmpty
        });
        setErrorMessages({
            name: isNameEmpty ? "Name cannot be empty" : "",
            address: isAddressEmpty ? "Address cannot be empty" : ""
        });

        return !(isNameEmpty || isAddressEmpty);
    }

    const handleClick = (e) => {
        e.preventDefault()
        if (!validateInputs()) return;

        const student = { name, address }
        console.log(student)
        fetch("http://localhost:8080/student/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(student)
        }).then(() => {
            console.log("New Student added")
            fetchStudents();
            resetState();
        })
    }

    return (
        <Container>
            <Paper elevation={3} style={paperStyle}>
                <Typography variant='h4'>Add Student</Typography>
                <form noValidate autoComplete="off">
                    <TextField id="outlined-required" label="Student Name" variant="outlined" fullWidth required
                        error={errors.name}
                        helperText={errorMessages.name}
                        sx={{ mt: 3 }}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField id="outlined-required" label="Student Address" variant="outlined" fullWidth required
                        error={errors.address}
                        helperText={errorMessages.address}
                        sx={{ mt: 3 }}
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    <Button sx={{ mt: 2, width: 1 / 4 }} variant="contained" color="secondary" onClick={handleClick}>
                        Submit
                    </Button>
                </form>
            </Paper>

            <Typography variant='h3' sx={{ fontWeight: 'bold' }}>Students</Typography>
            <Paper elevation={3} style={paperStyle}>
                {students.map(student => (
                    <Paper elevation={4} style={{ margin: "10px", padding: "15px", textAlign: "left" }} key={student.id}>
                        <Typography><strong>Id:</strong>&emsp;&emsp;&emsp;&emsp;{student.id}</Typography>
                        <Typography><strong>Name:</strong>&emsp;&emsp;{student.name}</Typography>
                        <Typography><strong>Address:</strong>&emsp;{student.address}</Typography>
                    </Paper>
                ))}
            </Paper>
        </Container>
    )
}
