package ru.frontend.animal_shelter.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class Search {
    @GetMapping(value = "/search")
    public String showSearchPage() {
        return "search";
    }
}   
