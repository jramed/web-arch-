package webarch.essd.upm.es;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MainPageController {
	
	@GetMapping("/")
	public String mainPage(Model model) {
		return "mainPage";
	}

}
