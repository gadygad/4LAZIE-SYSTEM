from html.parser import HTMLParser

class MyHTMLParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.depth = 0
        self.col_md_7_depth = -1
        self.col_md_7_line = -1

    def handle_starttag(self, tag, attrs):
        if tag == 'div':
            self.depth += 1
            attr_dict = dict(attrs)
            if 'class' in attr_dict and 'col-md-7' in attr_dict['class']:
                self.col_md_7_depth = self.depth
                self.col_md_7_line = self.getpos()[0]
                print(f"Found col-md-7 at depth {self.depth}, line {self.col_md_7_line}")

    def handle_endtag(self, tag):
        if tag == 'div':
            if self.depth == self.col_md_7_depth:
                print(f"col-md-7 closed at line {self.getpos()[0]}")
                self.col_md_7_depth = -1 # Prevent triggering again
            self.depth -= 1

parser = MyHTMLParser()
html = open('src/main/resources/templates/home.html').read()
parser.feed(html)
