param(
  [Parameter(Mandatory = $true)]
  [string]$FfmpegPath
)

$ErrorActionPreference = 'Stop'
$projectRoot = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$manifestPath = Join-Path $PSScriptRoot 'reader-audio-items.json'
$items = Get-Content -LiteralPath $manifestPath -Raw -Encoding UTF8 | ConvertFrom-Json

$speaker = New-Object -ComObject SAPI.SpVoice
$voiceToken = $speaker.GetVoices() | Where-Object {
  $_.GetDescription() -like 'Microsoft Zira Desktop*'
} | Select-Object -First 1
if (-not $voiceToken) { throw 'Microsoft Zira Desktop voice is not available.' }
$speaker.Voice = $voiceToken
$speaker.Rate = -1
$speaker.Volume = 100

$completed = 0
try {
  foreach ($item in $items) {
    $outputPath = Join-Path $projectRoot ($item.file -replace '/', '\')
    $outputDirectory = Split-Path -Parent $outputPath
    New-Item -ItemType Directory -Path $outputDirectory -Force | Out-Null
    if (Test-Path -LiteralPath $outputPath) {
      $completed += 1
      continue
    }

    $temporaryWave = [System.IO.Path]::ChangeExtension($outputPath, '.wav')
    try {
      $stream = New-Object -ComObject SAPI.SpFileStream
      $stream.Format.Type = 22
      $stream.Open($temporaryWave, 3, $false)
      $speaker.AudioOutputStream = $stream
      [void]$speaker.Speak([string]$item.text, 0)
      $stream.Close()
      $speaker.AudioOutputStream = $null
      [void][System.Runtime.InteropServices.Marshal]::ReleaseComObject($stream)
      & $FfmpegPath -hide_banner -loglevel error -y -i $temporaryWave -codec:a libmp3lame -b:a 96k $outputPath
      if ($LASTEXITCODE -ne 0) { throw "FFmpeg failed for $($item.text)" }
    }
    finally {
      $speaker.AudioOutputStream = $null
      if (Test-Path -LiteralPath $temporaryWave) {
        Remove-Item -LiteralPath $temporaryWave -Force
      }
    }
    $completed += 1
    if (($completed % 10) -eq 0 -or $completed -eq $items.Count) {
      Write-Host "Generated $completed / $($items.Count)"
    }
  }
}
finally {
  [void][System.Runtime.InteropServices.Marshal]::ReleaseComObject($speaker)
}
