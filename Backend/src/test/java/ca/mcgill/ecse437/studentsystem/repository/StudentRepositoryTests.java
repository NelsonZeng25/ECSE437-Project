package ca.mcgill.ecse437.studentsystem.repository;

import ca.mcgill.ecse437.studentsystem.model.Student;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jdbc.EmbeddedDatabaseConnection;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.ArrayList;
import java.util.List;

@DataJpaTest
@AutoConfigureTestDatabase(connection = EmbeddedDatabaseConnection.HSQLDB)
public class StudentRepositoryTests {

    @Autowired
    StudentRepository studentRepository;

    @AfterEach
    public void cleanUp() {
        studentRepository.deleteAll();
    }

    @Test
    public void contextLoads() {
        Assertions.assertNotNull(studentRepository);
    }

    @Test
    public void saveTest() {
        Student student = new Student();
        studentRepository.save(student);

        Assertions.assertTrue(studentRepository.findById(student.getId()).isPresent());
    }

    @Test
    public void saveAllTest() {
        int numOfStudents = 5;
        List<Student> students = new ArrayList<>();
        for (int i = 0; i < numOfStudents; i++) {
            students.add(new Student());
        }
        studentRepository.saveAll(students);

        Assertions.assertEquals(numOfStudents, studentRepository.findAll().size());
    }

    @Test
    public void deleteTest() {
        Student student = new Student();
        studentRepository.save(student);

        Assertions.assertTrue(studentRepository.findById(student.getId()).isPresent());

        studentRepository.deleteById(student.getId());

        Assertions.assertTrue(studentRepository.findById(student.getId()).isEmpty());

    }

    @Test
    public void deleteAllTest() {
        int numOfStudents = 5;
        List<Student> students = new ArrayList<>();
        for (int i = 0; i < numOfStudents; i++) {
            students.add(new Student());
        }
        studentRepository.saveAll(students);

        Assertions.assertEquals(numOfStudents, studentRepository.findAll().size());

        studentRepository.deleteAll();

        Assertions.assertEquals(0, studentRepository.findAll().size());
    }

    @Test
    public void updateTest() {
        Student student = new Student();
        student.setName("John");
        studentRepository.save(student);

        studentRepository.findById(student.getId()).ifPresentOrElse(
            s -> Assertions.assertEquals("John", s.getName()),
            Assertions::fail
        );

        student.setName("Johnson");
        studentRepository.save(student);

        studentRepository.findById(student.getId()).ifPresentOrElse(
            s -> Assertions.assertEquals("Johnson", s.getName()),
            Assertions::fail
        );
    }

    @Test
    public void updateAllTest() {
        int numOfStudents = 5;
        List<Student> students = new ArrayList<>();
        Student currentStudent;

        for (int i = 0; i < numOfStudents; i++) {
            currentStudent = new Student();
            currentStudent.setName("Student" + (i + 1));
            students.add(currentStudent);
        }
        studentRepository.saveAll(students);

        List<Student> findAllStudents = studentRepository.findAll();
        for (int i = 0; i < findAllStudents.size(); i++) {
            Assertions.assertEquals("Student" + (i+1), findAllStudents.get(i).getName());
        }

        for (int i = 0; i < numOfStudents; i++) {
            students.get(i).setName("Undergraduate" + (i+1));
        }
        studentRepository.saveAll(students);

        findAllStudents = studentRepository.findAll();
        for (int i = 0; i < findAllStudents.size(); i++) {
            Assertions.assertEquals("Undergraduate" + (i+1), findAllStudents.get(i).getName());
        }
    }
}
