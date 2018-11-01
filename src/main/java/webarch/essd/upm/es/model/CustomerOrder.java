package webarch.essd.upm.es.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;


@Entity
public class CustomerOrder {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	
	
	private String name;
	
	@ManyToMany(mappedBy="orders")
	private List<Product> products = new ArrayList<>();

	public CustomerOrder() {
	}

	public List<Product> getProducts() {
		return products;
	}

	public void setProducts(List<Product> products) {
		this.products = products;
	}

	public CustomerOrder(String name) {
		super();
		this.name = name;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	@Override
	public String toString() {
		return "CustomerOrder [id=" + id + ", name=" + name + ", products=" + products + "]";
	}

}
