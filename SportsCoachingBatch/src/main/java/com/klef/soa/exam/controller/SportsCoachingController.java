package com.klef.soa.exam.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.klef.soa.exam.entity.SportsCoaching;
import com.klef.soa.exam.service.SportsCoachingService;

@RestController
@RequestMapping("/sportscoaching")
public class SportsCoachingController {

    @Autowired
    private SportsCoachingService service;

    @GetMapping("/")
    public String demo() {
        return "Sports Coaching Project";
    }

    @PostMapping("/Add")
    public ResponseEntity<SportsCoaching> addSportsCoaching(
            @RequestBody SportsCoaching sports) {

        sports.setId(null);

        SportsCoaching sc = service.add(sports);
        return ResponseEntity.status(201).body(sc);
    }

    @GetMapping("/DisplayAll")
    public ResponseEntity<List<SportsCoaching>> displayAll() {

        List<SportsCoaching> sports = service.displayAll();
        return ResponseEntity.status(200).body(sports);
    }

    @DeleteMapping("/Delete/{id}")
    public ResponseEntity<String> deleteSportsCoaching(
            @PathVariable long id) {

        String message = service.delete(id);

        if (message.equals("SportsCoaching deleted successfully")) {
            return ResponseEntity.status(HttpStatus.OK).body(message);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(message);
        }
    }
}