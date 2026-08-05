package com.school.service;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.InputStream;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.HashMap;
import java.util.Map;

@Service
public class PdfParsingService {
    private static final Logger log = LoggerFactory.getLogger(PdfParsingService.class);

    private static final Pattern DATE_PATTERN = Pattern.compile("(\\d{4}-\\d{2}-\\d{2})|(\\d{2}/\\d{2}/\\d{4})");

    public Map<String, String> extractDatesFromPdf(MultipartFile file) {
        try {
            return extractDatesFromPdf(file.getInputStream());
        } catch (Exception e) {
            log.error("Failed to read multipart file", e);
            return new HashMap<>();
        }
    }

    public Map<String, String> extractDatesFromPdf(InputStream is) {
        Map<String, String> extractedDates = new HashMap<>();
        try (PDDocument document = PDDocument.load(is)) {
            PDFTextStripper pdfStripper = new PDFTextStripper();
            String text = pdfStripper.getText(document);
            if (text != null) {
                String[] lines = text.split("\\r?\\n");
                
                String currentContext = null;
                for (String line : lines) {
                    String lowerLine = line.toLowerCase();
                    // Detect Context
                    if (lowerLine.contains("cat 1") || lowerLine.contains("cat- 1") || lowerLine.contains("cat i ") || lowerLine.contains("cat i\t") || lowerLine.contains("cat-1")) {
                        currentContext = "CAT1";
                    } else if (lowerLine.contains("cat 2") || lowerLine.contains("cat- 2") || lowerLine.contains("cat ii ") || lowerLine.contains("cat ii\t") || lowerLine.contains("cat-2")) {
                        currentContext = "CAT2";
                    } else if (lowerLine.contains("ue ") || lowerLine.contains("university exam") || lowerLine.contains("end semester exam") || lowerLine.contains("ue\t") || lowerLine.contains(" u e ")) {
                        currentContext = "UE";
                    }

                    // Extract date if context is active
                    if (currentContext != null) {
                        Matcher m = DATE_PATTERN.matcher(line);
                        int dateCount = 0;
                        while (m.find()) { 
                            dateCount++;
                            String dateFound = normalizeDate(m.group());
                            
                            if ("UE".equals(currentContext)) {
                                // For UE, it's typically 'START to END' for SEM 1 and SEM 2
                                // 1st date = Sem 1 Start, 3rd date = Sem 2 Start
                                if (dateCount == 1 && !extractedDates.containsKey("UE_SEM1")) {
                                    extractedDates.put("UE_SEM1", dateFound);
                                } else if (dateCount == 3 && !extractedDates.containsKey("UE_SEM2")) {
                                    extractedDates.put("UE_SEM2", dateFound);
                                }
                            } else {
                                // For CATs, it's typically just 'DATE' for SEM 1 and 'DATE' for SEM 2
                                // 1st date = Sem 1, 2nd date = Sem 2
                                if (dateCount == 1) {
                                    if ("CAT1".equals(currentContext) && !extractedDates.containsKey("CAT1_SEM1")) extractedDates.put("CAT1_SEM1", dateFound);
                                    else if ("CAT2".equals(currentContext) && !extractedDates.containsKey("CAT2_SEM1")) extractedDates.put("CAT2_SEM1", dateFound);
                                } else if (dateCount == 2) {
                                    if ("CAT1".equals(currentContext) && !extractedDates.containsKey("CAT1_SEM2")) extractedDates.put("CAT1_SEM2", dateFound);
                                    else if ("CAT2".equals(currentContext) && !extractedDates.containsKey("CAT2_SEM2")) extractedDates.put("CAT2_SEM2", dateFound);
                                }
                            }
                        }
                        // Reset context after processing the line to avoid grabbing dates from subsequent unrelated lines
                        if (dateCount > 0) {
                            currentContext = null;
                        }
                    }
                }
            }
        } catch (Exception e) {
            log.error("Failed to parse PDF for dates: " + e.getMessage());
        }
        return extractedDates;
    }

    private String normalizeDate(String date) {
        // HTML form expects YYYY-MM-DD
        if (date.contains("/")) {
            // Assume DD/MM/YYYY
            String[] parts = date.split("/");
            if (parts.length == 3) {
                return parts[2] + "-" + parts[1] + "-" + parts[0];
            }
        }
        return date;
    }
}
