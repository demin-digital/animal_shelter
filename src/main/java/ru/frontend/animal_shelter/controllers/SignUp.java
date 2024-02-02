package ru.frontend.animal_shelter.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class SignUp {
    @GetMapping(value = "/sign-up")
    public String showSignUp() {
        return "sign-up";
    }
}

