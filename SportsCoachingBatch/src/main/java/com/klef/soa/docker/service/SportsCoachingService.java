
package com.klef.soa.docker.service;

import java.util.List;

import com.klef.soa.docker.dto.SportsCoachingRequest;
import com.klef.soa.docker.dto.SportsCoachingResponse;

public interface SportsCoachingService {

    public SportsCoachingResponse update(long id, SportsCoachingRequest sports);

    public SportsCoachingResponse add(SportsCoachingRequest sports);

    public List<SportsCoachingResponse> displayAll();

    public SportsCoachingResponse display(long id);

    public String delete(long id);
}
