package com.klef.soa.docker.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.klef.soa.docker.entity.SportsCoaching;

@Repository
public interface SportsCoachingRepository extends JpaRepository<SportsCoaching, Long> {

}