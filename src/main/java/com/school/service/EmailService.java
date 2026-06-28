package com.school.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired(required = false)
    private JavaMailSender mailSender;

    public void sendPasswordResetEmail(String to, String resetLink) {
        if (mailSender == null) {
            System.err.println("MailSender is not configured. Cannot send email to: " + to);
            return;
        }
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(to);
            message.setSubject("Password Reset Request - 4LAZIE");
            message.setText("Umeomba kubadilisha password yako.\n\nBofya link hii hapa chini ili kuweka password mpya. Link hii ita-expire ndani ya dakika 2.\n\n" + resetLink + "\n\nKama sio wewe, tafadhali puuza ujumbe huu.");
            mailSender.send(message);
        } catch (Exception e) {
            // Log the error but don't crash, especially if credentials aren't set
            System.err.println("Imeshindwa kutuma barua pepe: " + e.getMessage());
            System.out.println("Tafadhali kamilisha 'spring.mail.*' properties kwenye application.properties");
        }
    }
}
