---
title: Install
description: Install NARUZU on Windows or Linux, use the web app, and what to know about iPhone.
sidebar:
  order: 2
---

NARUZU comes in four forms. Pick the one that matches your computer.

| You have                        | Use                                    | Status                                                     |
| ------------------------------- | -------------------------------------- | ---------------------------------------------------------- |
| Windows 10 or 11, 64-bit        | Desktop app: installer or portable ZIP | Checked                                                    |
| Linux                           | AppImage, deb or tar.gz                | Packaged, **not yet verified** on a Linux desktop          |
| Any desktop with Chrome or Edge | Web app in the browser                 | Checked in automated tests; no real trainer connection run |
| iPhone                          | Not supported yet                      | **Not yet verified**; see below                            |

## Windows

You receive one file. Only trust a file that comes from the people who distribute the beta, and ask for the matching `SHA256SUMS.txt`.

**Option A: portable ZIP (no installer).** Extract the ZIP into a new, empty folder, then run `NARUZU.exe`. You do not need Node or any other tool.

**Option B: Setup file.** Run the Setup file. It installs for your Windows user only and does not need administrator rights.

### The Windows warning

The beta is **not code-signed**. Windows SmartScreen will probably say "Windows protected your PC". This is expected. Click **More info**, then **Run anyway**.

Because the build is unsigned, check the file yourself. In PowerShell:

```powershell
Get-FileHash .\path\to\your-downloaded-file
```

Compare the SHA-256 value with the line for your file in `SHA256SUMS.txt`. If they match, the file is the one the list describes and was not damaged. This does **not** prove who made it, so only use files and lists from a source you trust. If the values differ, do not run the file.

### Where your data lives

Desktop data is stored in `%APPDATA%\NARUZU` (paste that into the Explorer address bar). It stays when you update or uninstall. Do not delete it.

### Updating

NARUZU does not update itself. To update:

1. Finish or discard the current ride.
2. Export anything important (FIT files and a full backup, see [Settings](/naruzu-web/docs/user/settings/)).
3. Close NARUZU and copy the `%APPDATA%\NARUZU` folder somewhere safe.
4. Install the newer Setup over the old one, or extract the new ZIP into its own folder.
5. Reopen and check that your profile and saved rides are there.

**Settings, Data and accounts, About this copy** shows the version, build date and browser-engine version without using the network. When the build is more than 90 days old it says so, because the browser engine inside only gets security fixes through a newer NARUZU. It never blocks riding. There is also an optional once-a-day check for a newer version; it is off until you turn it on.

## Linux

Linux support is new. Packages are an AppImage, a deb and a tar.gz. The packaging was checked on Ubuntu 24.04 under WSL2, but **the packaged app has not been run on a real Linux desktop**. Bluetooth, the system keyring and graphics performance are **not yet verified**.

- Data is stored in `~/.config/NARUZU`.
- Bluetooth uses BlueZ, so `bluetoothd` must be running and your user must be allowed to use it. This is the part most likely to need attention.
- Signing in with linked accounts needs a system keyring (GNOME Keyring or KDE Wallet). Without one, the app refuses to store those tokens rather than store them unprotected.
- If the app exits at start with a sandbox error, your system may restrict user namespaces. See the project's Linux notes before changing any sandbox setting.

## Web app (browser)

Open the app in a supported desktop Chrome or Edge. For Bluetooth the page must be served over HTTPS or localhost.

To use it offline, open the app online once and wait: **Settings, Advanced, Offline use** says "Ready to ride offline" when the app is cached. A device that is short of free space keeps the app shell and says so. When a newer version is waiting, the app offers **Restart to update**; this stays disabled while a ride is live.

Browser data and desktop data are separate. Use a full backup to move data between them.

## iPhone

iPhone Safari cannot pair a trainer, because it does not support Web Bluetooth. A separate native iPhone app project exists, but **no iPhone install, native Bluetooth connection or ride has been run**, so this guide cannot tell you how well it works. Treat iPhone as unsupported for now.

_Last verified against version 0.1.0-beta.1._
