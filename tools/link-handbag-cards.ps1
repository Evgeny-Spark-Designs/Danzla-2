$ErrorActionPreference='Stop'
$root=Split-Path -Parent $PSScriptRoot
$targets=Get-ChildItem -Path $root -Filter '*.html' -Recurse | Where-Object {$_.FullName -notmatch '\\products\\(aero|atlas|milano|monaco|mosaic|passport|porter|siena|tresse)\\'}
$map=@{'Danzla Vela'='vela';'Danzla Oval'='oval';'Danzla Rondo'='rondo';'Danzla Half Moon'='half-moon';'Danzla Weave'='weave';'Danzla Duna'='duna';'Danzla Triangle'='triangle'}
foreach($file in $targets){
  $text=[IO.File]::ReadAllText($file.FullName)
  foreach($name in $map.Keys){
    $slug=$map[$name]
    $pattern="(?s)(<component-product-card\b.*?<a\s+class='component-product-card__link'\s+href=')[^']*(' aria-label='$([regex]::Escape($name))'.*?<p class='component-product-card__footer__details__label--edition[^']*'>Edition\s+)([^<]+)(</p>.*?</component-product-card>)"
    $text=[regex]::Replace($text,$pattern,{param($m)$m.Groups[1].Value+"../../products/$slug/index.html?color="+[uri]::EscapeDataString($m.Groups[3].Value.Trim())+$m.Groups[2].Value+$m.Groups[3].Value+$m.Groups[4].Value})
  }
  if($file.FullName -like '*collections\handbags\index.html' -and $text -notmatch 'collection-enhancements.js'){$text=$text -replace '</body>','<script src="../../assets/js/storefront.js"></script><script src="../../assets/js/collection-enhancements.js"></script></body>'}
  [IO.File]::WriteAllText($file.FullName,$text,(New-Object Text.UTF8Encoding($false)))
}
