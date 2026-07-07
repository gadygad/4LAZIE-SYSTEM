from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import inch, mm

c = canvas.Canvas("Applied_Chemistry_CAT_II.pdf", pagesize=A4)
width, height = A4

# 1. DRAW WATERMARK (Faint and refined)
c.saveState()
c.translate(width/2.0, height/2.0)
c.rotate(35)
c.setFillColorRGB(0.6, 0.6, 0.6, alpha=0.03) 
c.setFont("Helvetica-Bold", 65)

# Draw grid
for x in range(-1200, 1200, 250):
    for y in range(-1200, 1200, 150):
        c.drawString(x, y, "4LAZIE")
c.restoreState()

# 2. DRAW EXAM TEXT
c.setFillColorRGB(0, 0, 0, alpha=1)

# Header
c.setFont("Times-Bold", 11)
c.drawCentredString(width/2.0, height - 15*mm, "ST. JOSEPH COLLEGE OF ENGINEERING AND TECHNOLOGY")
c.setFont("Times-Bold", 10)
c.drawCentredString(width/2.0, height - 20*mm, "NTA LEVEL 5 - TECHNICIAN CERTIFICATE")
c.drawCentredString(width/2.0, height - 25*mm, "CONTINUOUS ASSESSMENT TEST - II - FEBRUARY-2026")
c.drawCentredString(width/2.0, height - 30*mm, "EDT 05103 - APPLIED CHEMISTRY")

# Meta Info
meta_y = height - 40*mm
c.setFont("Times-Bold", 10)
c.drawString(20*mm, meta_y, "SEMESTER: I")
c.drawString(20*mm, meta_y - 5*mm, "DURATION: 1 Hr 30 Min.")

c.drawRightString(width - 20*mm, meta_y, "YEAR: II")
c.drawRightString(width - 20*mm, meta_y - 5*mm, "MAX. MARKS: 50")

# Separator Line
c.setLineWidth(1)
c.line(20*mm, meta_y - 7*mm, width - 20*mm, meta_y - 7*mm)
c.setLineWidth(0.5)
c.line(20*mm, meta_y - 8*mm, width - 20*mm, meta_y - 8*mm)

# PART A
y = meta_y - 15*mm
c.setFont("Times-Bold", 10)
c.drawString(20*mm, y, "PART - A (Answer all the Questions)")
c.drawRightString(width - 20*mm, y, "(7 x 2 = 14)")

c.setFont("Times-Roman", 10)
y -= 6*mm
part_a = [
    "1.  The compressive strength of cement increases from 10² N/m² when initially set to 10⁷ N/m² after ____",
    "     days, reaching 70% of its final strength value (10⁸ N/m²) after ____ days.",
    "2.  What is a reclaimed rubber?",
    "3.  Define leaching as a concentration method in metallurgical operation.",
    "4.  What is powder metallurgy.",
    "5.  List the methods of making metal powder in powder metallurgy.",
    "6.  Why concentration is an important step that we can't skip during metallurgical operation?",
    "7.  Mention the metal constitutes of Amalgam Alloy."
]
for line in part_a:
    c.drawString(22*mm, y, line)
    y -= 5*mm

# PART B
y -= 2*mm
c.setFont("Times-Bold", 10)
c.drawString(20*mm, y, "PART - B (Answer any three Questions)")
c.drawRightString(width - 20*mm, y, "(3 x 4 = 12)")

c.setFont("Times-Roman", 10)
y -= 6*mm
part_b = [
    "8.   How lime is used in mining and metallurgy",
    "9.   Explain the meaning of the following Quicklime, Hydrated lime and Dolomite lime",
    "10. a) Define adhesive",
    "      b) what is bonding in adhesive?",
    "11. Explain Calcination as an oxidation method in metallurgy.",
    "12. What is the best method for extraction of sulphide ores? Explain it in brief.",
    "13. a) define rubber and Latex",
    "      b) Give any three defects of natural rubber."
]
for line in part_b:
    c.drawString(22*mm, y, line)
    y -= 5*mm

# PART C
y -= 2*mm
c.setFont("Times-Bold", 10)
c.drawString(20*mm, y, "PART - C (Answer any two Questions)")
c.drawRightString(width - 20*mm, y, "(2 x 12 = 24)")

c.setFont("Times-Roman", 10)
y -= 6*mm
part_c = [
    "14. Clinkering stage is one of the important step in Portland cement manufacturing, systematically explain",
    "      each of the process/step taking place during clinker production.",
    "15. Aluminium has increasingly replaced iron in several modern engineering applications; however, iron/steel",
    "      continue to serve as fundamental materials in engineering practice today.",
    "      a) In brief explain why aluminium has replaced iron in certain applications.",
    "      b) Discuss the limitations of aluminium that prevent it from completely replacing iron/steel in",
    "          engineering application/practice today",
    "16. After crushing/Grinding of Iron Ore (Haematite). The Next Process (Smelting) is normally carried out",
    "      in a blast furnace, a tall cylindrical furnace made of steel plates lined inside with fire bricks. Describe",
    "      the blast furnace as used in extraction of Iron.",
    "17. Explain the electro-refining or hall-héroult process of extraction of Aluminium (Al) from Alumina (Al₂O₃)"
]
for line in part_c:
    c.drawString(22*mm, y, line)
    y -= 5*mm

# Footer
c.setFont("Helvetica-Oblique", 9)
c.drawCentredString(width/2.0, 10*mm, "Page 1  —  Published: 2026 © 4LAZIE  |  Official Examination Document")

c.save()
