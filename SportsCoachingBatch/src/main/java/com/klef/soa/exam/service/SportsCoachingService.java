package com.klef.soa.exam.service;

import java.util.List;

import com.klef.soa.exam.entity.SportsCoaching;

public interface SportsCoachingService {

    public SportsCoaching add(SportsCoaching sports);

    public List<SportsCoaching> displayAll();

    public String delete(long id);

}