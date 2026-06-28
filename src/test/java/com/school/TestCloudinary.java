package com.school;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import java.util.Map;
import java.io.FileInputStream;
import java.util.Properties;

public class TestCloudinary {
    public static void main(String[] args) throws Exception {
        Properties props = new Properties();
        try (FileInputStream in = new FileInputStream("/home/careen/FOLDER/4LAZIE/src/main/resources/application.properties")) {
            props.load(in);
        }
        
        Cloudinary cloudinary = new Cloudinary(ObjectUtils.asMap(
            "cloud_name", props.getProperty("cloudinary.cloud_name", ""),
            "api_key", props.getProperty("cloudinary.api_key", ""),
            "api_secret", props.getProperty("cloudinary.api_secret", "")
        ));
        
        Map<?, ?> uploadResult = cloudinary.uploader().upload("Hello Cloudinary".getBytes(), ObjectUtils.asMap(
                "public_id", "test-auth-file.txt",
                "resource_type", "raw",
                "type", "authenticated"
        ));
        System.out.println("Upload Result: " + uploadResult);
        
        String signedUrl = cloudinary.url()
                .resourceType("raw")
                .type("authenticated")
                .signed(true)
                .generate("test-auth-file.txt");
        System.out.println("Signed URL: " + signedUrl);
        
        java.net.HttpURLConnection conn = (java.net.HttpURLConnection) new java.net.URL(signedUrl).openConnection();
        conn.setRequestMethod("GET");
        System.out.println("Response Code: " + conn.getResponseCode());
    }
}
