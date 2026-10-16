param(
  [string]$Source = 'C:\Users\PC\Downloads\中国旅行地图_分省可点击.html',
  [string]$Destination = 'D:\leon\assets\china-provinces.svg'
)

$html = Get-Content -Raw -LiteralPath $Source
$provincesStart = $html.IndexOf('<g id="provinces"')
$labelsStart = $html.IndexOf('<g id="labels"')
if ($provincesStart -lt 0 -or $labelsStart -lt 0) { throw 'Map groups were not found.' }

$labelsEnd = $html.IndexOf('</g>', $labelsStart)
if ($labelsEnd -lt 0) { throw 'Map labels were not closed.' }
$labelsEnd += 4

$provinces = $html.Substring($provincesStart, $labelsStart - $provincesStart)
$provinces = $provinces.Replace(' filter="url(#paper)"', '')
$labels = $html.Substring($labelsStart, $labelsEnd - $labelsStart)

$head = @'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="60 145 1210 690" role="img" aria-labelledby="map-title map-desc" preserveAspectRatio="xMidYMid meet">
<title id="map-title">Leon的中国分省旅行地图</title>
<desc id="map-desc">完整展示34个省级区域。云南已经解锁，可以进入昆明研学日记，其他地区等待探索。</desc>
<style>
  :root{--ink:#244454;--deep:#205f79;--blue:#347f9d;--line:#74afc5;--pale:#dff1f8;--paler:#eef8fc;--accent:#f4cf72;--white:#fff}
  *{box-sizing:border-box}
  .province{cursor:pointer;outline:none}
  .province path{fill:var(--pale);stroke:var(--white);stroke-width:2.6;stroke-linejoin:round;paint-order:stroke fill;vector-effect:non-scaling-stroke;transition:fill .2s ease,stroke .2s ease,filter .2s ease,transform .2s ease;transform-box:fill-box;transform-origin:center}
  .province:nth-child(3n+1) path{fill:#e7f5fa}.province:nth-child(3n+2) path{fill:#d6ecf5}
  .province:hover path,.province:focus path{fill:#b8ddea;stroke:var(--deep);stroke-width:2.2;filter:drop-shadow(2px 3px 0 #b5d7e3)}
  .province.selected path{fill:#b8ddea;stroke:var(--deep);stroke-width:2.2}
  #province-530000 path{fill:#79bfd9;stroke:var(--deep);stroke-width:3;filter:drop-shadow(3px 4px 0 #b5d7e3)}
  #province-530000:hover path,#province-530000:focus path{fill:#9ed5e8;transform:translateY(-2px)}
  #labels text{font:700 20px "STKaiti","KaiTi",serif;fill:#3d6474;paint-order:stroke;stroke:#f7fbfd;stroke-width:3px;stroke-linejoin:round}
  #labels text.tiny{font-size:14px}
  @media(prefers-reduced-motion:reduce){.province path{transition:none}}
</style>
'@

$tail = @'
<script><![CDATA[
  const regions = [...document.querySelectorAll('.province')];
  const yunnan = document.getElementById('province-530000');
  if (yunnan) {
    yunnan.setAttribute('role','link');
    yunnan.setAttribute('aria-label','云南省，已解锁，进入昆明研学日记');
  }
  function showLocked(name){
    try {
      const el = window.parent.document.getElementById('map-status');
      if(el) el.textContent = name + '篇还在路上';
      if(typeof window.parent.showLocked === 'function') window.parent.showLocked(name);
    } catch(e) {}
  }
  function activate(region){
    if(region.dataset.code === '530000'){
      window.top.location.href = new URL('../云南昆明研学日记.html', window.location.href).href;
      return;
    }
    regions.forEach(item=>item.classList.remove('selected'));
    region.classList.add('selected');
    showLocked(region.dataset.name);
  }
  regions.forEach(region=>{
    if(region.dataset.code !== '530000') region.setAttribute('aria-label',region.dataset.name + '，待解锁');
    region.addEventListener('click',()=>activate(region));
    region.addEventListener('keydown',event=>{
      if(event.key === 'Enter' || event.key === ' '){ event.preventDefault(); activate(region); }
    });
  });
]]></script>
</svg>
'@

$svg = $head + "`n" + $provinces + "`n" + $labels + "`n" + $tail
[System.IO.File]::WriteAllText($Destination, $svg, [System.Text.UTF8Encoding]::new($false))
Write-Output "Generated $Destination with $(([regex]::Matches($svg, 'class=\"province\"')).Count) provinces."
