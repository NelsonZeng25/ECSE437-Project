package ca.mcgill.ecse437.studentsystem.service;

import ca.mcgill.ecse437.studentsystem.model.Student;

import java.util.List;

public interface StudentService {
  public Student saveStudent(Student student);
  public List<Student> getAllStudents();
}
