package ru.frontend.animal_shelter.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MyAccount {
    @GetMapping(value = "/my-account")
    public String showMyAccountPage() {
        return "my-account";
    }
}
