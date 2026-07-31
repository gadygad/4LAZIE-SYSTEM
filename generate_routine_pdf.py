from fpdf import FPDF
import textwrap

pdf = FPDF()
pdf.add_page()
pdf.set_font("Arial", 'B', 16)
pdf.cell(0, 10, txt="My Daily Routine: A Balance of Productivity and Well-being", ln=1, align='C')
pdf.ln(5)

pdf.set_font("Arial", size=12)

essay = (
    "A well-structured daily routine is the cornerstone of a productive and fulfilling life. "
    "For me, balancing academic responsibilities, personal well-being, and leisure is essential "
    "for maintaining both mental and physical health. My day typically begins at 6:00 AM. I firmly "
    "believe that waking up early provides a serene and uninterrupted environment to set a positive "
    "tone for the hours ahead. The first thing I do is drink a large glass of water to rehydrate "
    "my body, followed by a twenty-minute session of light stretching and yoga. This morning ritual "
    "not only awakens my muscles but also clears my mind, preparing me for the challenges of the day.\n\n"
    
    "By 7:00 AM, I have showered and dressed, ready to enjoy a nutritious breakfast. I usually opt "
    "for oatmeal topped with fresh fruits and a cup of green tea, which fuels my energy levels sustainably. "
    "During breakfast, I review my schedule and prioritize my tasks, ensuring that my goals for the day "
    "are clear and attainable. The core of my day, from 8:30 AM to 3:00 PM, is dedicated to my academic "
    "pursuits. I attend my classes with active engagement, taking comprehensive notes and participating "
    "in discussions. Between lectures, I utilize short breaks to review my notes or take a brief walk "
    "to stay refreshed.\n\n"
    
    "After returning home and having a light, healthy lunch, I allocate the late afternoon to self-study "
    "and completing assignments. From 4:00 PM to 6:00 PM, I dive into deep work, free from distractions. "
    "I find that studying in focused, uninterrupted blocks significantly enhances my retention and comprehension "
    "of complex subjects. \n\n"
    
    "Evenings are reserved for relaxation and personal growth. Around 6:30 PM, I engage in some form of "
    "physical exercise, whether it is a brisk jog in the park or a workout session at the gym. This helps "
    "relieve any accumulated stress from the academic day. Following dinner with my family, where we share "
    "our daily experiences, I spend an hour reading a book or exploring topics outside my academic curriculum. "
    "By 9:30 PM, I begin my wind-down routine. I disconnect from all electronic screens to ensure a restful "
    "night and am usually asleep by 10:30 PM, fully recharged to embrace the next day."
)

# Textwrap to handle line breaks smoothly
for paragraph in essay.split("\n\n"):
    lines = textwrap.wrap(paragraph, width=90)
    for line in lines:
        pdf.cell(0, 8, txt=line, ln=1)
    pdf.ln(4)

pdf.output("Perfect_Daily_Routine.pdf")
