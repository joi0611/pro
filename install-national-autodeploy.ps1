$ErrorActionPreference = 'Stop'
$root = 'C:\ProgramData\NationalCloze'
$deploy = Join-Path $root 'deploy'
$node = Join-Path $root 'runtime\node.exe'
$updater = Join-Path $deploy 'national-autodeploy.cjs'
$server = Join-Path $root 'server.cjs'
$candidate = Join-Path $deploy 'server.candidate.cjs'
$appTask = 'NationalCloze-Staging-v1'
$autoTask = 'NationalCloze-AutoDeploy-v1'
$originalHash = (Get-FileHash -LiteralPath $server -Algorithm SHA256).Hash
$backup = Join-Path $root ('private\server-before-autodeploy-' + (Get-Date -Format 'yyyyMMddHHmmss') + '.cjs')
if (!(Test-Path -LiteralPath $node) -or !(Test-Path -LiteralPath $updater)) { throw 'Verified updater and installed Node are required' }
$existing = Get-ScheduledTask -TaskName $autoTask -ErrorAction SilentlyContinue
$wasAutoEnabled = $existing -and $existing.Settings.Enabled
& icacls.exe $deploy /inheritance:r /grant:r '*S-1-5-18:(OI)(CI)F' '*S-1-5-32-544:(OI)(CI)F' | Out-Null
if ($LASTEXITCODE -ne 0) { throw 'Deployment directory ACL failed' }
& $node $updater patch
if ($LASTEXITCODE -ne 0) { throw 'Backend compatibility check failed; original preserved' }
& $node --check $candidate
if ($LASTEXITCODE -ne 0) { throw 'Backend candidate syntax failed; original preserved' }
& $node $updater backup
if ($LASTEXITCODE -ne 0) { throw 'Database backup failed; original preserved' }
Copy-Item -LiteralPath $server -Destination $backup
$changed = $false
try {
  if ($existing) { Disable-ScheduledTask -TaskName $autoTask | Out-Null; Stop-ScheduledTask -TaskName $autoTask -ErrorAction SilentlyContinue }
  Disable-ScheduledTask -TaskName $appTask | Out-Null
  Stop-ScheduledTask -TaskName $appTask
  try {
    Move-Item -LiteralPath $candidate -Destination $server -Force
    $changed = $true
  } finally {
    Enable-ScheduledTask -TaskName $appTask | Out-Null
    Start-ScheduledTask -TaskName $appTask
  }
  $ready = $false
  for ($attempt=0; $attempt -lt 12; $attempt++) {
    try {
      $health = Invoke-RestMethod -Uri 'http://127.0.0.1:8788/healthz' -TimeoutSec 2
      if ($health.ok -and $health.databaseReady) { $ready=$true; break }
    } catch { }
    Start-Sleep -Seconds 1
  }
  if (!$ready) { throw 'Application readiness failed' }
  $syncOutput = & $node $updater sync
  if ($LASTEXITCODE -ne 0) { throw 'Initial website deployment or smoke checks failed' }
  Write-Output $syncOutput
  $syncResult = $syncOutput | ConvertFrom-Json
  if ($syncResult.unchanged) {
    & $node $updater verify
    if ($LASTEXITCODE -ne 0) { throw 'Existing website release verification failed' }
  }
  $action = New-ScheduledTaskAction -Execute $node -Argument ('"' + $updater + '" sync') -WorkingDirectory $deploy
  $startup = New-ScheduledTaskTrigger -AtStartup
  $repeat = New-ScheduledTaskTrigger -Once -At (Get-Date).AddMinutes(3) -RepetitionInterval (New-TimeSpan -Minutes 3)
  $settings = New-ScheduledTaskSettingsSet -Hidden -StartWhenAvailable -MultipleInstances IgnoreNew -ExecutionTimeLimit (New-TimeSpan -Minutes 5)
  $principal = New-ScheduledTaskPrincipal -UserId 'NT AUTHORITY\SYSTEM' -LogonType ServiceAccount -RunLevel Highest
  Register-ScheduledTask -TaskName $autoTask -Description 'Deploy validated national website assets from joi0611/pro eazycloze every 3 minutes; preserve account database' -Action $action -Trigger @($startup,$repeat) -Settings $settings -Principal $principal -Force | Out-Null
  $firstPollStart = Get-Date
  Start-ScheduledTask -TaskName $autoTask
  $firstPollVerified = $false
  for ($attempt=0; $attempt -lt 45; $attempt++) {
    $info = Get-ScheduledTaskInfo -TaskName $autoTask
    $task = Get-ScheduledTask -TaskName $autoTask
    if ($info.LastRunTime -ge $firstPollStart.AddSeconds(-1) -and $task.State -ne 'Running') {
      if ($info.LastTaskResult -ne 0) { throw 'First scheduled deployment poll failed' }
      $firstPollVerified = $true
      break
    }
    Start-Sleep -Seconds 1
  }
  if (!$firstPollVerified) { throw 'First scheduled deployment poll did not complete' }
  Write-Output 'NATIONAL_AUTODEPLOY_INSTALLED_AND_FIRST_RELEASE_VERIFIED'
  Write-Output 'GITHUB_SOURCE joi0611/pro main eazycloze/'
  Write-Output 'POLL_INTERVAL_MINUTES 3'
  Write-Output 'FIRST_SCHEDULED_POLL_VERIFIED'
  Write-Output 'DATABASE_PRESERVED; OTHER_BOARDS_UNCHANGED'
} catch {
  $failedTask = Get-ScheduledTask -TaskName $autoTask -ErrorAction SilentlyContinue
  if ($failedTask) { Disable-ScheduledTask -TaskName $autoTask | Out-Null; Stop-ScheduledTask -TaskName $autoTask -ErrorAction SilentlyContinue }
  if ($changed) {
    Disable-ScheduledTask -TaskName $appTask | Out-Null
    Stop-ScheduledTask -TaskName $appTask
    try { Copy-Item -LiteralPath $backup -Destination $server -Force }
    finally { Enable-ScheduledTask -TaskName $appTask | Out-Null; Start-ScheduledTask -TaskName $appTask }
    if ((Get-FileHash -LiteralPath $server -Algorithm SHA256).Hash -ne $originalHash) { throw 'Backend rollback verification failed' }
  }
  if ($wasAutoEnabled) { Enable-ScheduledTask -TaskName $autoTask | Out-Null }
  throw 'Automatic deployment was not enabled; previous backend restored. Inspect deploy/status.json for website check results.'
}
