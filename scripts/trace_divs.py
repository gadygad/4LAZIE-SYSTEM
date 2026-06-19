import sys
from bs4 import BeautifulSoup

def trace_file(filepath):
    with open(filepath, 'r') as f:
        html = f.read()

    soup = BeautifulSoup(html, 'html.parser')
    
    # Just to see structure at the row level
    try:
        row = soup.find('div', class_='row')
        print(f"--- {filepath} ---")
        if row:
            children = row.find_all('div', recursive=False)
            print("Direct children of row:")
            for c in children:
                classes = c.get('class', [])
                print("  div class:", classes)
        else:
            print("No row found.")
    except Exception as e:
        print(e)

trace_file('../src/main/resources/templates/dashboard.html')
trace_file('../src/main/resources/templates/guest_notes.html')
