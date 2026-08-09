import glob
from bs4 import BeautifulSoup
import os

html_files = glob.glob('c:/webluat/DemoWebLuat/**/*.html', recursive=True)

for file_path in html_files:
    if ".agents" in file_path or "node_modules" in file_path:
        continue
    
    with open(file_path, 'r', encoding='utf-8') as f:
        html = f.read()
    
    soup = BeautifulSoup(html, 'html.parser')
    
    footer = soup.find('footer')
    if not footer:
        continue
    
    grid = footer.find('div', class_=lambda c: c and 'grid' in c and 'gap-gutter' in c)
    if not grid:
        continue
        
    # Find components
    # Logo block: first div with col-span-1
    logo_block = grid.find('div', class_=lambda c: c and 'col-span-1' in c and 'mb-stack-' in c)
    if not logo_block: continue

    # Link columns: 4 div.flex.flex-col
    link_cols = grid.find_all('div', class_=lambda c: c and 'flex-col' in c and 'gap-stack-sm' in c)
    if len(link_cols) != 4:
        continue

    # Map block: div containing iframe
    iframe = grid.find('iframe')
    map_block = iframe.parent if iframe else None
    if not map_block or map_block.name != 'div':
        continue

    # Copyright block: div with copyright symbol © or text
    copyright_block = None
    divs = grid.find_all('div', class_=lambda c: c and 'col-span-1' in c, recursive=False)
    for div in divs:
        if '©' in div.get_text() and div != logo_block:
            copyright_block = div
            break
            
    # In some pages (calculator), the copyright is IN the logo block.
    if not copyright_block:
        # Check if copyright is inside logo block
        if '©' in logo_block.get_text():
            # We don't have a separate copyright block, it's ok.
            pass

    # If the layout is already updated to 12 columns, skip
    if 'md:grid-cols-12' in grid['class']:
        continue
        
    # Reconstruct the grid
    # Update grid classes
    classes = grid['class']
    new_classes = [c for c in classes if not c.startswith('md:grid-cols')]
    new_classes.append('md:grid-cols-12')
    grid['class'] = new_classes

    # Clear grid
    grid.clear()
    
    # Re-append Logo block
    if logo_block:
        logo_classes = logo_block['class']
        logo_classes = [c for c in logo_classes if not c.startswith('md:col-span')]
        logo_classes.append('md:col-span-12')
        logo_block['class'] = logo_classes
        grid.append(logo_block)
        grid.append('\n      ')

    # Append Map block
    if map_block:
        map_classes = map_block.get('class', [])
        map_classes = [c for c in map_classes if not c.startswith('md:col-span')]
        map_classes.extend(['md:col-span-5', 'lg:col-span-4'])
        # Also remove margin top if it has mt-stack-md to align well
        map_classes = [c for c in map_classes if c != 'mt-stack-md']
        map_block['class'] = map_classes
        
        # update iframe style to fit better
        if iframe:
            iframe_classes = iframe.get('class', [])
            if 'w-full' not in iframe_classes:
                iframe_classes.append('w-full')
            if 'h-full' not in iframe_classes:
                iframe_classes.append('h-full')
            iframe['class'] = iframe_classes
            iframe['height'] = '100%'
            iframe['style'] = iframe.get('style', '') + ' min-height: 250px;'
            
        grid.append(map_block)
        grid.append('\n      ')

    # Append Links block
    links_wrapper = soup.new_tag('div')
    links_wrapper['class'] = 'col-span-1 md:col-span-7 lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-gutter'
    for l in link_cols:
        links_wrapper.append('\n        ')
        links_wrapper.append(l)
    links_wrapper.append('\n      ')
    grid.append(links_wrapper)
    grid.append('\n      ')
    
    # Append Copyright block
    if copyright_block:
        copy_classes = copyright_block.get('class', [])
        copy_classes = [c for c in copy_classes if not c.startswith('md:col-span')]
        copy_classes.append('md:col-span-12')
        copyright_block['class'] = copy_classes
        grid.append(copyright_block)
        grid.append('\n    ')
        
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(str(soup))

print("Successfully reorganized footers.")
