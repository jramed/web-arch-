package webarch.essd.upm.es;

import org.springframework.data.jpa.repository.JpaRepository;

import webarch.essd.upm.es.model.Product;


public interface ProductRepository extends JpaRepository<Product, Long> {
	
}
