package com.klef.soa.exam.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.klef.soa.exam.entity.SportsCoaching;
import com.klef.soa.exam.repository.SportsCoachingRepository;

@Service
public class SportsCoachingServiceImpl implements SportsCoachingService {

    @Autowired
    private SportsCoachingRepository repository;

    @Override
    public SportsCoaching add(SportsCoaching sports) {
        return repository.save(sports);
    }

    @Override
    public List<SportsCoaching> displayAll() {
        return repository.findAll();
    }

    @Override
    public String delete(long id) {

        if (repository.existsById(id)) {
            repository.deleteById(id);
            return "SportsCoaching deleted successfully";
        } else {
            return "SportsCoaching ID Not Found";
        }
    }
}