package ru.frontend.animal_shelter.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class AdminOnly {
    @GetMapping(value = "/admin-only")
    public String showAdminOnlyPage() {
        return "admin-only";
    }
}
