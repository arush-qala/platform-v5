# Qala Platform - Image Download Script
# Downloads high-quality fashion images from Unsplash

Write-Host "Starting image download for Qala platform..." -ForegroundColor Green

# Maison Solène - Contemporary Parisian elegance
Write-Host "`nDownloading Maison Solène images..." -ForegroundColor Cyan
Invoke-WebRequest -Uri "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1920&q=80" -OutFile "public/images/brands/maison-solene/campaign/hero.jpg"
Invoke-WebRequest -Uri "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&q=80" -OutFile "public/images/brands/maison-solene/lookbook/look-01.jpg"
Invoke-WebRequest -Uri "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=1200&q=80" -OutFile "public/images/brands/maison-solene/lookbook/look-02.jpg"
Invoke-WebRequest -Uri "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200&q=80" -OutFile "public/images/brands/maison-solene/lookbook/look-03.jpg"
Invoke-WebRequest -Uri "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200&q=80" -OutFile "public/images/brands/maison-solene/lookbook/look-04.jpg"
Invoke-WebRequest -Uri "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?w=1200&q=80" -OutFile "public/images/brands/maison-solene/lookbook/look-05.jpg"
Invoke-WebRequest -Uri "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=1200&q=80" -OutFile "public/images/brands/maison-solene/products/dress-01.jpg"
Invoke-WebRequest -Uri "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=1200&q=80" -OutFile "public/images/brands/maison-solene/products/blazer-01.jpg"
Invoke-WebRequest -Uri "https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=1200&q=80" -OutFile "public/images/brands/maison-solene/products/pants-01.jpg"
Invoke-WebRequest -Uri "https://images.unsplash.com/photo-1558769132-cb1aea2f783d?w=1200&q=80" -OutFile "public/images/brands/maison-solene/process/atelier-01.jpg"
Invoke-WebRequest -Uri "https://images.unsplash.com/photo-1622519407650-3df9883f76e5?w=1200&q=80" -OutFile "public/images/brands/maison-solene/process/detail-01.jpg"

# Atelier Lumière - Artistic textiles
Write-Host "`nDownloading Atelier Lumière images..." -ForegroundColor Cyan
Invoke-WebRequest -Uri "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1920&q=80" -OutFile "public/images/brands/atelier-lumiere/campaign/hero.jpg"
Invoke-WebRequest -Uri "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200&q=80" -OutFile "public/images/brands/atelier-lumiere/lookbook/look-01.jpg"
Invoke-WebRequest -Uri "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=1200&q=80" -OutFile "public/images/brands/atelier-lumiere/lookbook/look-02.jpg"
Invoke-WebRequest -Uri "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?w=1200&q=80" -OutFile "public/images/brands/atelier-lumiere/lookbook/look-03.jpg"
Invoke-WebRequest -Uri "https://images.unsplash.com/photo-1544957992-20514f595d6f?w=1200&q=80" -OutFile "public/images/brands/atelier-lumiere/lookbook/look-04.jpg"
Invoke-WebRequest -Uri "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=1200&q=80" -OutFile "public/images/brands/atelier-lumiere/lookbook/look-05.jpg"
Invoke-WebRequest -Uri "https://images.unsplash.com/photo-1585487000143-5e34f1d94db9?w=1200&q=80" -OutFile "public/images/brands/atelier-lumiere/products/silk-dress-01.jpg"
Invoke-WebRequest -Uri "https://images.unsplash.com/photo-1617019114583-affb34d1b3cd?w=1200&q=80" -OutFile "public/images/brands/atelier-lumiere/products/coord-set-01.jpg"
Invoke-WebRequest -Uri "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=1200&q=80" -OutFile "public/images/brands/atelier-lumiere/process/painting-01.jpg"

# Casa Valentina - Italian resort wear
Write-Host "`nDownloading Casa Valentina images..." -ForegroundColor Cyan
Invoke-WebRequest -Uri "https://images.unsplash.com/photo-1467043237213-65f2da53396f?w=1920&q=80" -OutFile "public/images/brands/casa-valentina/campaign/hero.jpg"
Invoke-WebRequest -Uri "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=1200&q=80" -OutFile "public/images/brands/casa-valentina/lookbook/look-01.jpg"
Invoke-WebRequest -Uri "https://images.unsplash.com/photo-1582639510494-c80b5de9f148?w=1200&q=80" -OutFile "public/images/brands/casa-valentina/lookbook/look-02.jpg"
Invoke-WebRequest -Uri "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=1200&q=80" -OutFile "public/images/brands/casa-valentina/lookbook/look-03.jpg"
Invoke-WebRequest -Uri "https://images.unsplash.com/photo-1617019114583-affb34d1b3cd?w=1200&q=80" -OutFile "public/images/brands/casa-valentina/lookbook/look-04.jpg"
Invoke-WebRequest -Uri "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=1200&q=80" -OutFile "public/images/brands/casa-valentina/lookbook/look-05.jpg"
Invoke-WebRequest -Uri "https://images.unsplash.com/photo-1596783074918-c84cb06531ca?w=1200&q=80" -OutFile "public/images/brands/casa-valentina/products/linen-shirt-01.jpg"
Invoke-WebRequest -Uri "https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=1200&q=80" -OutFile "public/images/brands/casa-valentina/products/resort-pants-01.jpg"
Invoke-WebRequest -Uri "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=1200&q=80" -OutFile "public/images/brands/casa-valentina/products/evening-dress-01.jpg"
Invoke-WebRequest -Uri "https://images.unsplash.com/photo-1521676259650-675b5bfec1ae?w=1200&q=80" -OutFile "public/images/brands/casa-valentina/process/italian-atelier-01.jpg"

# Noir & Ivoire - Monochromatic minimalism
Write-Host "`nDownloading Noir & Ivoire images..." -ForegroundColor Cyan
Invoke-WebRequest -Uri "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1920&q=80" -OutFile "public/images/brands/noir-ivoire/campaign/hero.jpg"
Invoke-WebRequest -Uri "https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=1200&q=80" -OutFile "public/images/brands/noir-ivoire/lookbook/look-01.jpg"
Invoke-WebRequest -Uri "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=1200&q=80" -OutFile "public/images/brands/noir-ivoire/lookbook/look-02.jpg"
Invoke-WebRequest -Uri "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=1200&q=80" -OutFile "public/images/brands/noir-ivoire/lookbook/look-03.jpg"
Invoke-WebRequest -Uri "https://images.unsplash.com/photo-1591522811280-a8759970b03f?w=1200&q=80" -OutFile "public/images/brands/noir-ivoire/lookbook/look-04.jpg"
Invoke-WebRequest -Uri "https://images.unsplash.com/photo-1617019114583-affb34d1b3cd?w=1200&q=80" -OutFile "public/images/brands/noir-ivoire/lookbook/look-05.jpg"
Invoke-WebRequest -Uri "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=1200&q=80" -OutFile "public/images/brands/noir-ivoire/products/blazer-01.jpg"
Invoke-WebRequest -Uri "https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=1200&q=80" -OutFile "public/images/brands/noir-ivoire/products/pants-01.jpg"
Invoke-WebRequest -Uri "https://images.unsplash.com/photo-1617019114583-affb34d1b3cd?w=1200&q=80" -OutFile "public/images/brands/noir-ivoire/products/coord-set-01.jpg"
Invoke-WebRequest -Uri "https://images.unsplash.com/photo-1558769132-cb1aea2f783d?w=1200&q=80" -OutFile "public/images/brands/noir-ivoire/process/minimal-atelier-01.jpg"

# Luna Rosa - Bohemian luxury
Write-Host "`nDownloading Luna Rosa images..." -ForegroundColor Cyan
Invoke-WebRequest -Uri "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?w=1920&q=80" -OutFile "public/images/brands/luna-rosa/campaign/hero.jpg"
Invoke-WebRequest -Uri "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=1200&q=80" -OutFile "public/images/brands/luna-rosa/lookbook/look-01.jpg"
Invoke-WebRequest -Uri "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=1200&q=80" -OutFile "public/images/brands/luna-rosa/lookbook/look-02.jpg"
Invoke-WebRequest -Uri "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=1200&q=80" -OutFile "public/images/brands/luna-rosa/lookbook/look-03.jpg"
Invoke-WebRequest -Uri "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200&q=80" -OutFile "public/images/brands/luna-rosa/lookbook/look-04.jpg"
Invoke-WebRequest -Uri "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?w=1200&q=80" -OutFile "public/images/brands/luna-rosa/lookbook/look-05.jpg"
Invoke-WebRequest -Uri "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=1200&q=80" -OutFile "public/images/brands/luna-rosa/products/maxi-dress-01.jpg"
Invoke-WebRequest -Uri "https://images.unsplash.com/photo-1617019114583-affb34d1b3cd?w=1200&q=80" -OutFile "public/images/brands/luna-rosa/products/linen-coord-01.jpg"
Invoke-WebRequest -Uri "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=1200&q=80" -OutFile "public/images/brands/luna-rosa/products/silk-cami-01.jpg"
Invoke-WebRequest -Uri "https://images.unsplash.com/photo-1604849715471-b602efe7c979?w=1200&q=80" -OutFile "public/images/brands/luna-rosa/process/bohemian-studio-01.jpg"

Write-Host "`n✅ All images downloaded successfully!" -ForegroundColor Green
Write-Host "Total images: 47" -ForegroundColor Yellow

