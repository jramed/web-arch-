package webarch.essd.upm.es.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;

@Entity
public class Product {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	
	private String name;
	
	private String status;

	@ManyToMany
	private List<CustomerOrder> orders = new ArrayList<>();
	
	protected Product() {
		
	}

	public Product(String name, String status) {
		super();
		this.name = name;
		this.status = status;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
	
	public List<CustomerOrder> getOrders() {
		return orders;
	}

	public void setOrders(List<CustomerOrder> orders) {
		this.orders = orders;
	}
	
	@Override
	public String toString() {
		return "Product [id = " + id + ", name=" + name + ", status="+ status +"]";
	}
	
	@Override
	public boolean equals(Object obj) {
		if (obj == null) {
			return false;
		}
		
		if (!Product.class.isAssignableFrom(obj.getClass())) {
			return false;
		}
			
		final Product other = (Product)obj;
		if (this.getName().equals(other.getName())) {
			return true;
		}
		
		return false;
	}
	
	public boolean equalsStatus(Object obj) {
		if (obj == null) {
			return false;
		}
		
		if (!Product.class.isAssignableFrom(obj.getClass())) {
			return false;
		}
			
		final Product other = (Product)obj;
		if (this.getStatus().equals(other.getStatus())) {
			return true;
		}
		
		return false;
	}

	
	
}
