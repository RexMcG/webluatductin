import re

with open('c:/webluat/DemoWebLuat/index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Clean up wrapped headings by removing the surrounding divs and just leaving one clean version
def clean_heading(match):
    inner_text = match.group(1).strip()
    return f'''<div class="text-center mb-10 w-full flex flex-col items-center justify-center">
  <h2 class="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary uppercase text-center mb-2">{inner_text}</h2>
  <div class="text-accent flex items-center justify-center mt-1">
    <span class="tracking-widest">— o —</span>
  </div>
</div>'''

# Match any messy nested div that contains an h2 with text
pattern = r'<div class="text-center mb-8">.*?<h2[^>]*>([^<]+)</h2>.*?</div>\s*</div>\s*</div>'
content = re.sub(pattern, clean_heading, content, flags=re.DOTALL)

# Let's also check for single wrappers that might exist
pattern2 = r'<div class="text-center mb-10[^>]*>.*?<h2[^>]*>([^<]+)</h2>.*?</div>\s*</div>'
# We don't want to double replace, so we'll just run a general cleanup if needed.
# Let's just find ALL H2s and re-write them properly by extracting their text.
# Actually, the safest way is:

# Find all blocks of text that look like the messy heading structure
messy_pattern = r'<div class="text-center mb-8">[\s\S]*?<h2[^>]*>([^<]+)</h2>[\s\S]*?(?:— o —[\s\S]*?){2}</div>\s*</div>'
content = re.sub(messy_pattern, clean_heading, content)

with open('c:/webluat/DemoWebLuat/index.html', 'w', encoding='utf-8') as f:
    f.write(content)
print("Cleaned up headings.")
