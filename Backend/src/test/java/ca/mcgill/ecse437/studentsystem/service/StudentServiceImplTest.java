package ca.mcgill.ecse437.studentsystem.service;

import ca.mcgill.ecse437.studentsystem.model.Student;
import ca.mcgill.ecse437.studentsystem.repository.StudentRepository;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class StudentServiceImplTest {

    @Mock
    private StudentRepository studentRepository;

    StudentServiceImpl studentServiceImpl;

    @BeforeEach
    void setUp() {
        studentServiceImpl = new StudentServiceImpl(studentRepository);
    }

    @Test
    @DisplayName("should return all the students")
    void getAllStudents() {
        studentServiceImpl.getAllStudents();
        Mockito.verify(studentRepository).findAll();
    }

    @Test
    @DisplayName("should save student")
    void returnListOfSavedStudents() {
        Student tStudent = new Student();
        tStudent.setName("testName"); 

        when(studentRepository.findAll()).thenReturn(List.of(tStudent));

        studentServiceImpl.saveStudent(tStudent);
        Mockito.verify(studentRepository).save(tStudent);
        assertEquals("testName", studentServiceImpl.getAllStudents().get(0).getName());
    }
}