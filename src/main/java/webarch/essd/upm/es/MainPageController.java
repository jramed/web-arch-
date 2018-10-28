package webarch.essd.upm.es;

import java.util.List;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import webarch.essd.upm.es.model.CustomerOrder;
import webarch.essd.upm.es.model.Product;

@Controller
public class MainPageController {
	
	@Autowired
	private ProductRepository productRepository;
	
	@Autowired
	private CustomerOrderRepository customerOrderRepository;
	
	@PostConstruct
	public void init() {

		CustomerOrder order1 = new CustomerOrder("Selección");
		CustomerOrder order2 = new CustomerOrder("FC Barcelona");
		CustomerOrder order3 = new CustomerOrder("Atlético de Madrid");
		
		customerOrderRepository.save(order1);
		customerOrderRepository.save(order2);
		customerOrderRepository.save(order3);
		
		Product p1 = new Product("product1");
		Product p2 = new Product("product2");
		
		p1.getOrders().add(order1);
		p1.getOrders().add(order2);
		
		p2.getOrders().add(order1);
		p2.getOrders().add(order3);
		
		productRepository.save(p1);
		productRepository.save(p2);
}
	
	@GetMapping("/wa-main-page")
	public String customerOrders(Model model) {
		List<CustomerOrder> customerOrders = customerOrderRepository.findAll();
		boolean showEmptyOrdersMsg = false ;
		boolean showOrders = false;
		if(0 == customerOrders.size()) {
			showEmptyOrdersMsg = true;
		}
		else {
			showOrders = true;
		}
		System.out.println("The DB content is: " + customerOrders);
		model.addAttribute("showEmptyOrdersMsg", showEmptyOrdersMsg);
		model.addAttribute("showOrders", showOrders);
		model.addAttribute("customerOrders", customerOrders);
		return "wa-main-page";
	}

}
