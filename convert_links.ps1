$content = Get-Content -Path "pdf_version.html" -Raw -Encoding UTF8

# 1. Start Button (Page 1) - Unicode Fix
$content = $content -replace '<button id="next-to-page2"([\s\S]*?)>([\s\S]*?)</button>', '<a href="#page-2" id="next-to-page2"$1 style="display:inline-block; text-align:center; text-decoration:none;">$2</a>'

# 2. Page 3 Prev
$content = $content -replace '<button id="page3-prev"([\s\S]*?)>([\s\S]*?)</button>', '<a href="#page-2" id="page3-prev"$1 style="display:inline-block; text-align:center; text-decoration:none;">$2</a>'

# 3. Page 5 Next
$content = $content -replace '<button id="page5-next"([\s\S]*?)>([\s\S]*?)</button>', '<a href="#page-6" id="page5-next"$1 style="display:inline-block; text-align:center; text-decoration:none;">$2</a>'

# 4. Lesson Navigation (Back buttons)
# Replace all "Voltar para Aulas" buttons
$content = $content -replace '<button class="back-to-page7([\s\S]*?)>([\s\S]*?)</button>', '<a href="#page-7" class="back-to-page7$1 style="display:inline-flex; align-items:center;">$2</a>'

# Replace "Sumário" buttons
$content = $content -replace '<button class="back-to-sumario([\s\S]*?)>([\s\S]*?)</button>', '<a href="#page-5" class="back-to-sumario$1 style="display:inline-flex; align-items:center;">$2</a>'

# 5. Lesson Next Buttons
$content = $content -replace '<button id="lesson1-next"([\s\S]*?)>([\s\S]*?)</button>', '<a href="#lesson-2" id="lesson1-next"$1 style="display:inline-flex; align-items:center;">$2</a>'
$content = $content -replace '<button id="lesson2-next"([\s\S]*?)>([\s\S]*?)</button>', '<a href="#lesson-3" id="lesson2-next"$1 style="display:inline-flex; align-items:center;">$2</a>'
$content = $content -replace '<button id="lesson3-next"([\s\S]*?)>([\s\S]*?)</button>', '<a href="#lesson-4" id="lesson3-next"$1 style="display:inline-flex; align-items:center;">$2</a>'
$content = $content -replace '<button id="lesson4-next"([\s\S]*?)>([\s\S]*?)</button>', '<a href="#lesson-5" id="lesson4-next"$1 style="display:inline-flex; align-items:center;">$2</a>'
$content = $content -replace '<button id="lesson5-next"([\s\S]*?)>([\s\S]*?)</button>', '<a href="#lesson-6" id="lesson5-next"$1 style="display:inline-flex; align-items:center;">$2</a>'
$content = $content -replace '<button id="lesson6-next"([\s\S]*?)>([\s\S]*?)</button>', '<a href="#lesson-7" id="lesson6-next"$1 style="display:inline-flex; align-items:center;">$2</a>'
$content = $content -replace '<button id="lesson7-next"([\s\S]*?)>([\s\S]*?)</button>', '<a href="#lesson-8" id="lesson7-next"$1 style="display:inline-flex; align-items:center;">$2</a>'
$content = $content -replace '<button id="lesson8-next"([\s\S]*?)>([\s\S]*?)</button>', '<a href="#lesson-9" id="lesson8-next"$1 style="display:inline-flex; align-items:center;">$2</a>'
$content = $content -replace '<button id="lesson9-next"([\s\S]*?)>([\s\S]*?)</button>', '<a href="#lesson-10" id="lesson9-next"$1 style="display:inline-flex; align-items:center;">$2</a>'

Set-Content -Path "pdf_version.html" -Value $content -Encoding UTF8
