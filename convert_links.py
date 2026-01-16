import re
import os

file_path = 'pdf_version.html'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Start Button (Page 1) - Already done by PS script, but let's be safe
# Pattern: text "Iniciar" inside button
# content = re.sub(r'<button([^>]*)id="next-to-page2"([^>]*)>(.*?)</button>', r'<a href="#page-2"\1id="next-to-page2"\2 style="display:inline-block; text-align:center; text-decoration:none;">\3</a>', content, flags=re.DOTALL)

# 2. Back to Lessons (back-to-page7)
# This was the one failing due to newlines
# We look for class="back-to-page7" inside the button tag
def repl_back_to_page7(match):
    attrs = match.group(1)
    inner = match.group(2)
    # Ensure it's an anchor now
    return f'<a href="#page-7" {attrs} style="display:inline-flex; align-items:center; text-decoration:none;">{inner}</a>'

content = re.sub(r'<button\s+([^>]*class="back-to-page7[^>]*)>(.*?)</button>', repl_back_to_page7, content, flags=re.DOTALL)

# 3. Next Lesson Buttons (lessonX-next)
# They usually have id="lessonX-next"
for i in range(1, 10):
    curr = i
    next_l = i + 1
    
    pattern = re.compile(f'<button\\s+([^>]*id="lesson{curr}-next"[^>]*)>(.*?)</button>', re.DOTALL)
    
    def repl_next_lesson(match):
        attrs = match.group(1)
        inner = match.group(2)
        return f'<a href="#lesson-{next_l}" {attrs} style="display:inline-flex; align-items:center; text-decoration:none;">{inner}</a>'
        
    content = pattern.sub(repl_next_lesson, content)

# 4. Back to Sumario (back-to-sumario) if exists
content = re.sub(r'<button\s+([^>]*class="back-to-sumario[^>]*)>(.*?)</button>', 
                 r'<a href="#page-5" \1 style="display:inline-flex; align-items:center; text-decoration:none;">\2</a>', 
                 content, flags=re.DOTALL)

# 5. Generic PREV/NEXT buttons on main pages (ids pageX-prev, pageX-next)
# PS script might have missed some if they had newlines
def repl_page_nav(match):
    attrs = match.group(1)
    inner = match.group(2)
    
    # Extract ID to determine target
    id_match = re.search(r'id="page(\d+)-(prev|next)"', attrs)
    if not id_match:
        return match.group(0) # Should not happen given regex
    
    page_num = int(id_match.group(1))
    direction = id_match.group(2)
    
    target_page = page_num + 1 if direction == 'next' else page_num - 1
    
    return f'<a href="#page-{target_page}" {attrs} style="display:inline-block; text-align:center; text-decoration:none;">{inner}</a>'

content = re.sub(r'<button\s+([^>]*id="page\d+-(?:prev|next)"[^>]*)>(.*?)</button>', repl_page_nav, content, flags=re.DOTALL)


with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Conversion complete.")
