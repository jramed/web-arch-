package webarch.essd.upm.es;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

//import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import webarch.essd.upm.es.model.CustomerOrder;
import webarch.essd.upm.es.model.Product;

@Controller
public class MainPageController {
	
	@Autowired
	private ProductRepository productRepository;
	
	@Autowired
	private CustomerOrderRepository customerOrderRepository;
	
	@GetMapping("/wa-main-page")
	public String customerOrders(Model model) {
		generateMainPageData(model);
		return "wa-main-page";
	}

	private void generateMainPageData(Model model) {
		List<CustomerOrder> customerOrders = customerOrderRepository.findAll();
		boolean showEmptyOrdersMsg = false ;
		boolean showOrders = false;
		if(0 == customerOrders.size()) {
			showEmptyOrdersMsg = true;
		}
		else {
			showOrders = true;
		}

		model.addAttribute("showEmptyOrdersMsg", showEmptyOrdersMsg);
		model.addAttribute("showOrders", showOrders);
		model.addAttribute("customerOrders", customerOrders);
	}
	
	@GetMapping("/wa-place-new-order")
	public String placeNewOrder(Model model) {
		
		return "wa-place-new-order";
	}
	
	@GetMapping("/wa-store-order")
	public String storeNewOrder(Model model, @RequestParam String name, 
			@RequestParam(value="productNames[]") String[] productNames) {
		
		CustomerOrder customerOrder = new CustomerOrder(name);
		CustomerOrder customerOrder1 = customerOrderRepository.save(customerOrder);
		
		for (String productName : productNames) {
			Product p1 = new Product(productName);
			p1.getOrders().add(customerOrder1);
			productRepository.save(p1);
		}
		
		//Systemout.println("The order content is: " + customerOrder1.toString());
		generateMainPageData(model);		
		return "wa-main-page";
	}
	
	@GetMapping("/wa-detail-order/{id:\\d+}")
	public String detailOrder(Model model, @PathVariable long id) {
		Optional<CustomerOrder> customerOrder = customerOrderRepository.findById(id);
		if (customerOrder.isPresent()) {
			//Systemout.println("The order content read form DB is: "+ customerOrder.toString());
			model.addAttribute("name", customerOrder.get().getName());
			List<String> products = customerOrder.get().getProducstNames();
			//Systemout.println("The list of products is: "+ products.toString());
			model.addAttribute("products", products);
			model.addAttribute("id", id);
			return "wa-shop-basket";
		}
		
		return "public/404.html";
	}
	
	@GetMapping("/wa-remove-order/{id}")
	public String removeOrder(Model model, @PathVariable long id) {
		Optional<CustomerOrder> customerOrder = customerOrderRepository.findById(id);
		if (customerOrder.isPresent()) {
			for (Product product: customerOrder.get().getProducts()) {
				productRepository.delete(product);
			}
			//Systemout.println("Inside remove order and with id: "+ id);
			customerOrderRepository.delete(customerOrder.get());
			generateMainPageData(model);
			return "wa-main-page";
		}
		return "public/404.html";
	}
	
	@GetMapping("/wa-update-order/{id}")
	public String updateOrder(Model model, @PathVariable long id) {
		Optional<CustomerOrder> customerOrder = customerOrderRepository.findById(id);
		if ( customerOrder.isPresent()) {
			List<Product> products = customerOrder.get().getProducts();
			model.addAttribute("products",products);
			model.addAttribute("orderName", customerOrder.get().getName());
			model.addAttribute("orderId", customerOrder.get().getId());
			return "wa-update-order";
		}
		return "public/404.html";
	}
	
	@GetMapping("/wa-store-update-order/{id}")
	public String storeUpdateOrder(Model model, @PathVariable long id, 
			@RequestParam(value="productNames[]") String[] productNames) {

		Optional<CustomerOrder> customerOrder = customerOrderRepository.findById(id);

		if (customerOrder.isPresent()) {
			List<Product> modifiedProducts = new ArrayList<>();
			for (String productName : productNames) {
				Product p1 = new Product(productName);
				modifiedProducts.add(p1);
			}

			List<Product> storedProducts = customerOrder.get().getProducts();
			
			ArrayList<Product> productsToAdd = new ArrayList<Product>(modifiedProducts);
			productsToAdd.removeAll(storedProducts);
			ArrayList<Product> productsToRemove = new ArrayList<Product>(storedProducts);
			productsToRemove.removeAll(modifiedProducts);

			for (Product productAdd : productsToAdd) {
				Product p1 = new Product(productAdd.getName());
				p1.getOrders().add(customerOrder.get());
				productRepository.save(p1);
			}

			for (Product productRemove: productsToRemove) {
				productRepository.delete(productRemove);
			}
		}
		generateMainPageData(model);
		return "wa-main-page";
	}
	
}
