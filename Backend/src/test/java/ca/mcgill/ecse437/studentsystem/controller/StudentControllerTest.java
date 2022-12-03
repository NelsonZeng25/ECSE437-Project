package ca.mcgill.ecse437.studentsystem.controller;

import ca.mcgill.ecse437.studentsystem.model.Student;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import ca.mcgill.ecse437.studentsystem.service.StudentService;

import java.util.*;

import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = StudentController.class)
public class StudentControllerTest {

  @Autowired
  private MockMvc mockMvc;

  @MockBean
  private StudentService studentService;

  @Test
  public void createStudent() throws Exception {
    Student student = new Student(1, "Joe", "Madison Street");

    mockMvc.perform(post("/student/add")
            .contentType(MediaType.APPLICATION_JSON)
            .content(new ObjectMapper().writeValueAsString(student))
        )
        .andExpect(status().isOk());
  }

  @Test
  public void getAllStudents() throws Exception {
    given(studentService.getAllStudents()).willReturn(
        List.of(new Student(1, "John", "Test Street"), new Student(2, "Bob", "Parker Street"))
    );

    mockMvc.perform(get("/student/getAll"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$[0].id").value(1))
        .andExpect(jsonPath("$[0].name").value("John"))
        .andExpect(jsonPath("$[0].address").value("Test Street"))
        .andExpect(jsonPath("$[1].id").value(2))
        .andExpect(jsonPath("$[1].name").value("Bob"))
        .andExpect(jsonPath("$[1].address").value("Parker Street"));
  }
}
