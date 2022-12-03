package ca.mcgill.ecse437.studentsystem;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@ActiveProfiles("test")
@SpringBootTest(classes = BackendApplication.class)
class BackendApplicationTests {

	@Test
	void contextLoads() {
		Assertions.assertNotNull(BackendApplication.class);
	}

}
