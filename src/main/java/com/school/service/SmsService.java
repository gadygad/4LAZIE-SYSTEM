package com.school.service;

import org.springframework.stereotype.Service;

@Service
public class SmsService {

    // In a real environment we would use an API like Twilio, InfoBip, etc.
    // For now we just print to console for testing.
    public void sendPasswordResetSms(String phoneNumber, String resetLink) {
        System.out.println("=========================================================");
        System.out.println(">>> [SMS MOCK] Sent to number: " + phoneNumber);
        System.out.println(">>> Message: You requested a password reset. Click this link:");
        System.out.println(">>> " + resetLink);
        System.out.println(">>> (Will expire after 2 minutes)");
        System.out.println("=========================================================");
    }
}
