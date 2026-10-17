package com.klef.soa.exam.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.klef.soa.exam.entity.SportsCoaching;
import com.klef.soa.exam.service.SportsCoachingService;

@RestController
@RequestMapping("/sportscoaching")
public class SportsCoachingController {

    @Autowired
    private SportsCoachingService service;

    @PostMapping("/add")
    public SportsCoaching add(@RequestBody SportsCoaching sports) {
        return service.add(sports);
    }

    @GetMapping("/displayall")
    public List<SportsCoaching> displayAll() {
        return service.displayAll();
    }

    @DeleteMapping("/delete/{id}")
    public String delete(@PathVariable long id) {
        return service.delete(id);
    }
}