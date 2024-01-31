package ru.frontend.animal_shelter.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;


@Controller
public class SignIn {

    @GetMapping(value = "/sign-in")
    public String showSignIn() {
        return "signin";
    }
    
    
}
