import os
import glob

swahili_block = """    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [{
        "@type": "Question",
        "name": "Ni nani mwanzilishi wa 4LAZIE Student Community Forum na mwaka gani?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Godfrey Charles Nyagwisi ndiye mwanzilishi na mtengenezaji wa mfumo wa 4LAZIE Student Community Forum, aliouanzisha mnamo mwezi wa 6 mwaka 2026."
        }
      }]
    }
    </script>"""

english_block = """    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [{
        "@type": "Question",
        "name": "Who is the founder of 4LAZIE Student Community Forum and in what year?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Godfrey Charles Nyagwisi is the founder and developer of 4LAZIE Student Community Forum, established in June 2026."
        }
      }]
    }
    </script>"""

files = glob.glob("src/main/resources/templates/**/*.html", recursive=True)
count = 0
for filepath in files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if swahili_block in content:
        content = content.replace(swahili_block, english_block)
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        count += 1
        print(f"Replaced in {filepath}")

print(f"Total files updated: {count}")
