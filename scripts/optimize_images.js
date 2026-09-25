const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imgDir = path.join(__dirname, '..', 'public', 'img');

async function optimize() {
  console.log('🚀 Bắt đầu nén và tối ưu hóa toàn bộ hình ảnh...');

  const files = fs.readdirSync(imgDir);
  let totalBefore = 0;
  let totalAfter = 0;

  // 1. Hero banner
  const herobannerPath = path.join(imgDir, 'herobanner.png');
  if (fs.existsSync(herobannerPath)) {
    const stat = fs.statSync(herobannerPath);
    totalBefore += stat.size;
    
    // Create optimized WebP
    await sharp(herobannerPath)
      .resize({ width: 1920, withoutEnlargement: true })
      .webp({ quality: 80, effort: 6 })
      .toFile(path.join(imgDir, 'herobanner.webp'));

    // Create optimized JPG fallback
    await sharp(herobannerPath)
      .resize({ width: 1920, withoutEnlargement: true })
      .jpeg({ quality: 80, mozjpeg: true })
      .toFile(path.join(imgDir, 'herobanner.jpg'));

    // Replace original png with highly compressed version
    const pngBuffer = await sharp(herobannerPath)
      .resize({ width: 1920, withoutEnlargement: true })
      .png({ compressionLevel: 9, quality: 80 })
      .toBuffer();
    fs.writeFileSync(herobannerPath, pngBuffer);
    totalAfter += pngBuffer.length;
    console.log(`✅ herobanner: ${(stat.size/1024).toFixed(1)}KB -> ${(pngBuffer.length/1024).toFixed(1)}KB (WebP: ${(fs.statSync(path.join(imgDir, 'herobanner.webp')).size/1024).toFixed(1)}KB)`);
  }

  // 2. Avatars
  const avatars = [
    { file: 'avatar1.png', size: 300 },
    { file: 'avatar2.png', size: 300 },
    { file: 'avatar3.png', size: 300 },
  ];

  for (const item of avatars) {
    const p = path.join(imgDir, item.file);
    if (fs.existsSync(p)) {
      const stat = fs.statSync(p);
      totalBefore += stat.size;

      const webpName = item.file.replace('.png', '.webp');
      await sharp(p)
        .resize({ width: item.size, height: item.size, fit: 'cover' })
        .webp({ quality: 82, effort: 6 })
        .toFile(path.join(imgDir, webpName));

      const pngBuf = await sharp(p)
        .resize({ width: item.size, height: item.size, fit: 'cover' })
        .png({ compressionLevel: 9, quality: 82 })
        .toBuffer();
      fs.writeFileSync(p, pngBuf);
      totalAfter += pngBuf.length;
      console.log(`✅ ${item.file}: ${(stat.size/1024).toFixed(1)}KB -> ${(pngBuf.length/1024).toFixed(1)}KB (WebP: ${(fs.statSync(path.join(imgDir, webpName)).size/1024).toFixed(1)}KB)`);
    }
  }

  // 3. Zalo icon
  const zaloPath = path.join(imgDir, '1280px-Icon_of_Zalo.svg.png');
  if (fs.existsSync(zaloPath)) {
    const stat = fs.statSync(zaloPath);
    totalBefore += stat.size;

    await sharp(zaloPath)
      .resize({ width: 96, height: 96, fit: 'contain' })
      .webp({ quality: 85 })
      .toFile(path.join(imgDir, 'zalo_icon.webp'));

    const zaloBuf = await sharp(zaloPath)
      .resize({ width: 96, height: 96, fit: 'contain' })
      .png({ compressionLevel: 9 })
      .toBuffer();
    fs.writeFileSync(zaloPath, zaloBuf);
    totalAfter += zaloBuf.length;
    console.log(`✅ zalo_icon: ${(stat.size/1024).toFixed(1)}KB -> ${(zaloBuf.length/1024).toFixed(1)}KB`);
  }

  // 4. Client logos
  for (let i = 1; i <= 7; i++) {
    const matched = files.find(f => f.startsWith(`${i}_`) && f.endsWith('.png'));
    if (matched) {
      const p = path.join(imgDir, matched);
      const stat = fs.statSync(p);
      totalBefore += stat.size;

      const webpName = matched.replace('.png', '.webp');
      await sharp(p)
        .resize({ height: 128, fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 85 })
        .toFile(path.join(imgDir, webpName));

      const logoBuf = await sharp(p)
        .resize({ height: 128, fit: 'inside', withoutEnlargement: true })
        .png({ compressionLevel: 9 })
        .toBuffer();
      fs.writeFileSync(p, logoBuf);
      totalAfter += logoBuf.length;
      console.log(`✅ logo ${matched}: ${(stat.size/1024).toFixed(1)}KB -> ${(logoBuf.length/1024).toFixed(1)}KB`);
    }
  }

  // 5. Logo website
  const logoWebPath = path.join(imgDir, 'Logo_website.png');
  if (fs.existsSync(logoWebPath)) {
    const stat = fs.statSync(logoWebPath);
    totalBefore += stat.size;

    await sharp(logoWebPath)
      .resize({ width: 350, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(path.join(imgDir, 'Logo_website.webp'));

    const logoBuf = await sharp(logoWebPath)
      .resize({ width: 350, fit: 'inside', withoutEnlargement: true })
      .png({ compressionLevel: 9 })
      .toBuffer();
    fs.writeFileSync(logoWebPath, logoBuf);
    totalAfter += logoBuf.length;
    console.log(`✅ Logo_website: ${(stat.size/1024).toFixed(1)}KB -> ${(logoBuf.length/1024).toFixed(1)}KB (WebP: ${(fs.statSync(path.join(imgDir, 'Logo_website.webp')).size/1024).toFixed(1)}KB)`);
  }

  console.log(`🎉 HOÀN THÀNH TỐI ƯU HÓA: ${(totalBefore/1024/1024).toFixed(2)} MB -> ${(totalAfter/1024).toFixed(1)} KB (Giảm hơn 90% dung lượng hình ảnh!)`);
}

optimize().catch(console.error);
