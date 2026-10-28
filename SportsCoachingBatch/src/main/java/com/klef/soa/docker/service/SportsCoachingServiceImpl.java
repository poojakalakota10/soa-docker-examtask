
package com.klef.soa.docker.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.klef.soa.docker.entity.SportsCoaching;
import com.klef.soa.docker.repository.SportsCoachingRepository;
import com.klef.soa.docker.exception.ResourceNotFoundException;
import com.klef.soa.docker.dto.SportsCoachingRequest;
import com.klef.soa.docker.dto.SportsCoachingResponse;

@Service
public class SportsCoachingServiceImpl implements SportsCoachingService {

    @Autowired
    private SportsCoachingRepository repository;

    @Override
    public SportsCoachingResponse update(long id, SportsCoachingRequest sports) {

        SportsCoaching existing = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("SportsCoaching ID Not Found: " + id));

        existing.setSportName(sports.getSportName());
        existing.setCoachName(sports.getCoachName());
        existing.setStudentCount(sports.getStudentCount());
        existing.setActive(sports.getActive());

        SportsCoaching saved = repository.save(existing);

        return convertToResponse(saved);
    }

    @Override
    public SportsCoachingResponse add(SportsCoachingRequest sports) {

        SportsCoaching entity = new SportsCoaching();

        entity.setSportName(sports.getSportName());
        entity.setCoachName(sports.getCoachName());
        entity.setStudentCount(sports.getStudentCount());
        entity.setActive(sports.getActive());

        SportsCoaching saved = repository.save(entity);

        return convertToResponse(saved);
    }

    @Override
    public List<SportsCoachingResponse> displayAll() {

        return repository.findAll()
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public SportsCoachingResponse display(long id) {

        SportsCoaching sports = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("SportsCoaching ID Not Found: " + id));

        return convertToResponse(sports);
    }

    @Override
    public String delete(long id) {

        if (repository.existsById(id)) {
            repository.deleteById(id);
            return "SportsCoaching Deleted Successfully";
        } else {
            throw new ResourceNotFoundException("SportsCoaching ID Not Found: " + id);
        }
    }

    private SportsCoachingResponse convertToResponse(SportsCoaching sports) {

        return new SportsCoachingResponse(
                sports.getId(),
                sports.getSportName(),
                sports.getCoachName(),
                sports.getStudentCount(),
                sports.getActive()
        );
    }
}
