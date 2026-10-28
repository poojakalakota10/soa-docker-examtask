
package com.klef.soa.docker.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.klef.soa.docker.dto.SportsCoachingRequest;
import com.klef.soa.docker.dto.SportsCoachingResponse;
import com.klef.soa.docker.service.SportsCoachingService;

@RestController
@RequestMapping("/sportscoaching")
public class SportsCoachingController {

    @Autowired
    private SportsCoachingService service;

    @PutMapping("/update/{id}")
    public SportsCoachingResponse update(@PathVariable long id, @RequestBody SportsCoachingRequest sports) {
        return service.update(id, sports);
    }

    @PostMapping("/add")
    public SportsCoachingResponse add(@RequestBody SportsCoachingRequest sports) {
        return service.add(sports);
    }

    @GetMapping("/displayall")
    public List<SportsCoachingResponse> displayAll() {
        return service.displayAll();
    }

    @GetMapping("/display/{id}")
    public SportsCoachingResponse display(@PathVariable long id) {
        return service.display(id);
    }

    @GetMapping("/")
    public String demo() {
        return "SportsCoaching Project";
    }

    @DeleteMapping("/delete/{id}")
    public String delete(@PathVariable long id) {
        return service.delete(id);
    }
}
