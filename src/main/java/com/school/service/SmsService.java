package com.school.service;

import org.springframework.stereotype.Service;

@Service
public class SmsService {

    // Katika mazingira ya kweli hapa tungetumia API ya Twilio, InfoBip au nyinginezo.
    // Kwa sasa tunaprint kwenye console tu ili kuruhusu testing.
    public void sendPasswordResetSms(String phoneNumber, String resetLink) {
        System.out.println("=========================================================");
        System.out.println(">>> [SMS MOCK] Imetumwa kwa namba: " + phoneNumber);
        System.out.println(">>> Ujumbe: Umeomba kubadilisha password. Bofya link hii:");
        System.out.println(">>> " + resetLink);
        System.out.println(">>> (Ita-expire baada ya dakika 2)");
        System.out.println("=========================================================");
    }
}
