package com.klef.soa.docker.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="exam_2400031987")

public class SportsCoaching {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name="sportsname",length=100,nullable = false)
    private String sportName;

    @Column(name="coachname",length=100,nullable = false)
    private String coachName;

    @Column(name="studentcount",nullable = false)
    private Integer studentCount;

    @Column(name="active",nullable = false)
    private Boolean active;


    // Getters and Setters

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


    // toString()

    @Override
    public String toString() {
        return "SportsCoaching [id=" + id + ", sportName=" + sportName
                + ", coachName=" + coachName + ", studentCount=" + studentCount
                + ", active=" + active + "]";
    }

}