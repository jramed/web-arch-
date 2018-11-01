package webarch.essd.upm.es;

import org.springframework.data.jpa.repository.JpaRepository;

import webarch.essd.upm.es.model.CustomerOrder;


public interface CustomerOrderRepository extends JpaRepository<CustomerOrder, Long> {
	
}
