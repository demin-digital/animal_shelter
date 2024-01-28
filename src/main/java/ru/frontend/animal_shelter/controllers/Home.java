package ru.frontend.animal_shelter.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class Home {

    @GetMapping(value = "/")
    public String showMainPage() {
        return "home";
    }
}
