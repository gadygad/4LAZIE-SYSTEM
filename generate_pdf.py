from fpdf import FPDF

pdf = FPDF()
pdf.add_page()
pdf.set_font("Arial", size=15)
pdf.cell(200, 10, txt="My Daily Routine", ln=1, align='C')
pdf.set_font("Arial", size=12)

routine = [
    "6:00 AM - Wake up, make the bed, and drink a glass of water.",
    "6:15 AM - Morning exercise or stretching.",
    "7:00 AM - Shower and get dressed.",
    "7:30 AM - Eat a healthy breakfast and review goals for the day.",
    "8:00 AM - Start working or studying.",
    "1:00 PM - Lunch break and a short walk.",
    "2:00 PM - Resume work or study sessions.",
    "5:30 PM - Wrap up daily tasks and organize the workspace.",
    "6:00 PM - Dinner with family or friends.",
    "7:00 PM - Relax, read a book, or watch a show.",
    "9:30 PM - Prepare for bed (disconnect from screens).",
    "10:00 PM - Sleep."
]

pdf.cell(200, 10, txt="", ln=1, align='L')
for item in routine:
    pdf.cell(200, 10, txt=item, ln=1, align='L')

pdf.output("daily_routine.pdf")
