import os
import shutil

src_dir = 'c:/webluat/DemoWebLuat'
backup_dir = os.path.join(src_dir, '.backup')

if not os.path.exists(backup_dir):
    os.makedirs(backup_dir)

# Files/folders to keep in the root
keep = ['.git', '.agents', '.backup', 'PROJECT_STRUCTURE.md']

for item in os.listdir(src_dir):
    if item in keep:
        continue
    
    item_path = os.path.join(src_dir, item)
    dest_path = os.path.join(backup_dir, item)
    
    if os.path.exists(dest_path):
        if os.path.isdir(dest_path):
            shutil.rmtree(dest_path)
        else:
            os.remove(dest_path)
            
    shutil.move(item_path, backup_dir)
    print(f'Moved {item} to .backup')

print("Backup complete. Ready for Next.js init.")
