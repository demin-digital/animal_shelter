package ru.frontend.animal_shelter.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class Info {
    @GetMapping(value = "/info")
    public String showInfoPage() {
        return "info";
    }
}
