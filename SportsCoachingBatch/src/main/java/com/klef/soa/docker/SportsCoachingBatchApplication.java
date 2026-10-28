package com.klef.soa.docker;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SportsCoachingBatchApplication {

	public static void main(String[] args) {
		SpringApplication.run(SportsCoachingBatchApplication.class, args);
		System.out.println("CRUD SERVICE IS Running...!!!!");
	}
}