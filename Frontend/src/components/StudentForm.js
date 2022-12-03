import React, { useEffect, useState } from 'react';
import { Container, Paper, Button, TextField } from '@mui/material';
import { Typography } from '@mui/material';

const studentsTestData = [
    {
        id: 1,
        name: "John Johnson",
        address: "Test Street"
    },
    {
        id: 2,
        name: "Bro Broson",
        address: "Test Street 2"
    },
    {
        id: 3,
        name: "Test Tester",
        address: "Test Street 3"
    }
]

export default function StudentForm() {
    const paperStyle = { padding: '50px 20px', width: 600, margin: "20px auto" }
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [students, setStudents] = useState(studentsTestData)

    const handleClick = (e) => {
        e.preventDefault()
        const student = { name, address }
        console.log(student)
        fetch("http://localhost:8080/student/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(student)
        }).then(() => {
            console.log("New Student added")
            setName('');
            setAddress('');
        })
    }

    useEffect(() => {
        fetch("http://localhost:8080/student/getAll")
            .then(res => res.json())
            .then((result) => {
                setStudents(result);
            })
    }, [])

    return (
        <Container>
            <Paper elevation={3} style={paperStyle}>
                <Typography variant='h4'>Add Student</Typography>
                <form noValidate autoComplete="off">
                    <TextField id="outlined-basic" label="Student Name" variant="outlined" fullWidth
                        sx={{ mt: 3 }}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField id="outlined-basic" label="Student Adress" variant="outlined" fullWidth
                        sx={{ mt: 3 }}
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    <Button sx={{ mt: 2, width: 1/4 }} variant="contained" color="secondary" onClick={handleClick}>
                        Submit
                    </Button>
                </form>
            </Paper>

            <Typography variant='h3' sx={{fontWeight: 'bold'}}>Students</Typography>
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
