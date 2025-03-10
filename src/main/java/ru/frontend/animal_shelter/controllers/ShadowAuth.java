package ru.frontend.animal_shelter.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ShadowAuth {
        @GetMapping(value = "/shadow-auth")
    public String showShadowAuthPage() {
        return "shadow-auth";
    }
}
