import glob
import re

for file in glob.glob('*.html'):
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Remove the entire div block that contains jp-matrix
    content = re.sub(r'<div class="jp-matrix" id="jp-matrix" aria-hidden="true">.*?</div>', '', content, flags=re.DOTALL|re.IGNORECASE)
    
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

print("Matrix forcibly removed.")
