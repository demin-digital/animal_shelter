package ru.frontend.animal_shelter.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class Favorite {
    @GetMapping(value = "/favorite")
    public String showFavoritePage() {
        return "favorite";
    }
}
