package ru.frontend.animal_shelter.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class Details {
    @GetMapping(value = "/details")
    public String showDetailsPage() {
        return "details";
    }
}
