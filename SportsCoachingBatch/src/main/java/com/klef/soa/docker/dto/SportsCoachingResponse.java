
package com.klef.soa.docker.dto;

public class SportsCoachingResponse {

    private Long id;
    private String sportName;
    private String coachName;
    private Integer studentCount;
    private Boolean active;

    public SportsCoachingResponse() {
    }

    public SportsCoachingResponse(Long id, String sportName, String coachName,
                                  Integer studentCount, Boolean active) {
        this.id = id;
        this.sportName = sportName;
        this.coachName = coachName;
        this.studentCount = studentCount;
        this.active = active;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSportName() {
        return sportName;
    }

    public void setSportName(String sportName) {
        this.sportName = sportName;
    }

    public String getCoachName() {
        return coachName;
    }

    public void setCoachName(String coachName) {
        this.coachName = coachName;
    }

    public Integer getStudentCount() {
        return studentCount;
    }

    public void setStudentCount(Integer studentCount) {
        this.studentCount = studentCount;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }
}
