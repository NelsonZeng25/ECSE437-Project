package ca.mcgill.ecse437.studentsystem.controller;

import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;

import ca.mcgill.ecse437.studentsystem.repository.StudentRepository;
import ca.mcgill.ecse437.studentsystem.service.StudentService;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(classes = StudentControllerTest.class)
@AutoConfigureMockMvc
public class StudentControllerTest {
  private static final Logger LOGGER = LoggerFactory.getLogger(StudentController.class);

  @Autowired
  private MockMvc mockMvc;

  @MockBean
  private StudentService studentService;

  @MockBean
  private StudentRepository studentRepository;

  @Test
  public void listAll() throws Exception {
    final ResultActions resultActions = this.mockMvc.perform(get("/student//getAll")).andExpect(status().isOk());

    resultActions.andExpect(status().isOk());

    MvcResult result = resultActions.andReturn();
    String contentAsString = result.getResponse().getContentAsString();

    LOGGER.info("Here is the content: " + contentAsString);

  }

}
