package ru.frontend.animal_shelter.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

// Тут идет определение правил кто и с какими доступами может зайти на определенную страницу
@Configuration
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
        return http
                .authorizeHttpRequests(requests -> requests
                        .requestMatchers("/secret-page").hasRole("USER")
                        .requestMatchers("/", "/**").permitAll())
                .formLogin(login -> login
                        .loginPage("/sign-up"))
                .build();

    }

}
