---
title: Setting up Fedora GNOME the OEM+ way
description: My checklist for turning a fresh Fedora install into a polished desktop — settings, GNOME extensions, apps, and the pitfalls I've hit along the way.
date: 2026-10-11
tags: [linux, fedora, gnome]
difficulty: beginner
cover: ./covers/fedora-thumbnail.webp
---

This is the checklist I follow whenever I set up a machine with Fedora. It's
an "OEM+" setup: stock Fedora and GNOME, with a handful of tweaks and
extensions that make it feel more polished and familiar, without turning it
into something else entirely. Everything here can be adjusted to your taste.

Steps 1–6 are the main setup, in order. After that, [optional
setups](#optional-setups) covers things only some machines need, like extra
drives or docking stations.

> Written for **Fedora 43 with GNOME 49**. Most of it applies to other recent
> versions too, but menu names and package versions shift over time.

## 1. First boot

Go through the normal setup when you first install Fedora: language, keyboard
layout, timezone, Wi-Fi and so on.

When it offers to **enable third-party repositories**, say yes. That adds
Flathub, Steam, NVIDIA drivers and a few other things Fedora can't ship
itself. If you skipped it, you can turn it on later:

```bash
sudo dnf install fedora-workstation-repositories
sudo dnf config-manager setopt rpmfusion-nonfree-steam.enabled=1
```

Then, **before installing anything else**, update the system and reboot:

```bash
sudo dnf upgrade --refresh
```

> **Why update first:** it clears up a lot of possible issues with later
> installs, and it's also the first thing to try when something misbehaves
> down the line. Hold off on bigger changes, like upgrading to a new Fedora
> release, until everything is set up and stable.

## 2. Settings

Open **Settings**, from the app menu or the quick menu in the top right:

- **Appearance:** set the style to _Dark_ (if that's your preference) and pick
  a new background.
- **System → Date & Time:** show the weekday (and seconds, if you like) in the
  top bar clock.
- **Power:** show the battery percentage, on a laptop.
- **Mouse & Touchpad:** natural scrolling is on for touchpads by default; I
  keep it off for mice.

Then install **GNOME Tweaks** from the Software centre and, under _Windows_,
turn on the **minimise and maximise buttons**. They're much more familiar than
GNOME's default of only having a close button.

> **Coming from Ubuntu?** Ubuntu's Settings has an _Ubuntu Desktop_ section
> for the dock and desktop icons. Fedora doesn't — those options come from the
> Dash to Dock and Desktop Icons NG extensions [below](#extensions-i-use).

## 3. Flatpak and Flathub

Flatpak is the default way to install apps on Fedora, and Flathub (the main
app store) comes with the third-party repositories from step 1. If Flathub is
missing from the Software centre, add it yourself:

```bash
flatpak remote-add --if-not-exists flathub https://dl.flathub.org/repo/flathub.flatpakrepo
```

> If you needed to add it, **reboot before installing any Flatpak apps.**

## 4. GNOME extensions

Extensions are what turn stock GNOME into something that feels finished.
Don't be afraid to try them — they can be turned off or removed in a click.

### Installing extensions

The easiest way is the **Extension Manager** app from Flathub: it browses,
installs and configures extensions without leaving the app.

You can also install them from
[extensions.gnome.org](https://extensions.gnome.org/) in your browser. It will
prompt you to install a browser add-on; do so, and install the connector it
talks to:

```bash
sudo dnf install gnome-browser-connector
```

> **Pitfall:** without the connector you'll get _"No such native application
> org.gnome.chrome_gnome_shell"_ on the website. The command above fixes it.

To turn extensions on and off and change their settings, use Extension
Manager, or Fedora's own **Extensions** app (`gnome-extensions-app`).

### Version compatibility

GNOME refuses to load extensions that aren't marked as supporting your exact
GNOME version, which is common right after a new release. You can turn that
check off:

```bash
gsettings set org.gnome.shell disable-extension-version-validation true
```

Do this at your own discretion. I've had no problems with the extensions below
even when they were marked as incompatible — and if one does misbehave, you can
just turn it off.

### Extensions I use

- **Alphabetical App Grid** — sorts the app grid and folders alphabetically.
  You can choose whether folders go first, and whether their contents get
  sorted too.
- **Blur my Shell** — blurs the background of the overview, lock screen, dock
  and top bar. It makes everything look better; I keep the defaults.
- **Clipboard History** — like the clipboard history on Windows: keeps track of
  what you've copied. See [below](#clipboard-history-on-super--v) to put it on
  the same shortcut.
- **Dash to Dock** — strongly recommended. It makes the dock feel familiar: it
  shows on the desktop, hides when a window covers it, can be blurred by Blur
  my Shell, and resized. My settings:
  - _Position on screen:_ **Bottom**
  - _Panel mode: extend to the screen edge:_ **off**
  - _Intelligent autohide:_ **on** (the default)
  - _Launchers → Show Applications icon → Move at beginning of the dock:_
    **on**
- **Desktop Icons NG (DING)** — puts icons (folders, AppImages, documents…) on
  the desktop. I turn off _Show personal folder_ in its settings.
- **Emoji Copy** — quick access to emojis from the top bar.
- **GNOME Fuzzy App Search** — forgives small typos when searching for apps,
  showing close matches instead of nothing.
- **GSConnect** — pairs your computer with your phone. It's very feature-rich
  and almost feels like magic: file transfer, media controls, and even using
  your phone as a touchpad and keyboard. Great for watching media, but both
  devices need to be on the same Wi-Fi.
- **No overview at start-up** — personal preference: boot straight to the
  desktop instead of the overview.
- **Pinned Apps in AppGrid** — pin your most-used apps to the start of the
  app grid.
- **Tiling Shell** — proper window tiling for GNOME, with predefined layouts
  and drag-to-side resizing.
- **Unblank lock screen** — keeps the screen on after locking instead of it
  going to sleep almost immediately. Partly because it looks cool.
- **Vitals** — CPU, RAM and network usage in the top bar, so you don't need to
  open a system monitor. Have a play with its settings.
- **Volume Scroller** — scroll over the top bar to change the volume. Much
  quicker than function keys or the quick menu for small adjustments.

Situational ones:

- **Brightness control using ddcutil** — monitor brightness on a desktop PC
  (laptops have this built in). See
  [below](#brightness-control-on-a-desktop).
- **Hide Top Bar** — hides the top bar when a window covers it. It can be
  glitchy in games depending on fullscreen or windowed mode, so I keep it off
  most of the time.
- **Quick Settings Tweaks** — per-app volume in the quick settings menu, and
  notifications there instead of under the calendar.
- **Apps on Top** — moves the apps icon to the start of the dock. Only needed
  if you _don't_ use Dash to Dock, which has this built in.

### Brightness control on a desktop

Install the _Brightness control using ddcutil_ extension, then `ddcutil`
itself:

```bash
sudo dnf install ddcutil
```

In my experience that's all it takes. If you need further setup, the
[extension's README](https://github.com/daitj/gnome-display-brightness-ddcutil)
covers it.

In the extension's settings, move it from _Top Bar_ to _System Menu_ for a
more OEM+ look, and set _Position in System Menu_ to 1 or 2 so it sits just
above or below the volume slider. You can also hide the display name, though
you may want to keep it with multiple monitors.

### Clipboard History on Super + V

To make Clipboard History work like Windows' `Win + V`, set its shortcut to
**Super + V** in its settings.

> **Pitfall:** GNOME already uses Super + V (and Super + M) for **Show the
> notification list**. Change it in _Settings → Keyboard → View and Customise
> Shortcuts → System_, or from the terminal, keeping just Super + M:
>
> ```bash
> gsettings set org.gnome.shell.keybindings toggle-message-tray "['<Super>m']"
> ```

## 5. Installing apps

> **Restart before installing apps.** It's best practice after all of these
> changes, so pin or bookmark this guide so you don't lose your place.

Install apps as Flatpaks from the Software centre where you can. Some come as
RPMs from a vendor's own repository instead (Brave, for example), and a few as
AppImages. If something won't install or run, online forums, Reddit or an AI
assistant can be a quick saviour.

Also install **Flatseal**. Flatpak apps are sandboxed, so some permissions
need to be granted by hand — Steam on a second drive is the classic example.

Apps I install:

| Category | Apps                                                     |
| -------- | -------------------------------------------------------- |
| Code     | VSCodium (or VS Code), Postman, draw.io                  |
| Office   | OnlyOffice (clean, just the essentials) or LibreOffice   |
| Internet | Brave, Betterbird (email), LocalSend (share with phones) |
| Media    | VLC, Stremio, OBS, Kdenlive, GIMP                        |
| Games    | Steam (from the third-party repos in step 1)             |
| Social   | Discord                                                  |
| Tools    | Flatseal, Extension Manager, Fedora Media Writer         |

## 6. The finishing touch

To tie it all together — and to be proud of your new, hopefully stable,
operating system — install `screenfetch`:

```bash
sudo dnf install screenfetch
```

Then run `screenfetch` in your terminal to get a graphic of your distro and
system details. Here's mine:

```text
           /:-------------:\          eusebiu@fedora
        :-------------------::        OS: Fedora 43
      :-----------/shhOHbmp---:\      Kernel: x86_64 Linux 6.17.1-300.fc43.x86_64
    /-----------omMMMNNNMMD  ---:     Uptime: 4h 15m
   :-----------sMMMMNMNMP.    ---:    Packages: 2195
  :-----------:MMMdP-------    ---\   Shell: bash 5.3.0
 ,------------:MMMd--------    ---:   Resolution: No X Server
 :------------:MMMd-------    .---:   DE: GNOME 49.1
 :----    oNMMMMMMMMMNho     .----:   WM: Mutter
 :--     .+shhhMMMmhhy++   .------/   WM Theme: Adwaita
 :-    -------:MMMd--------------:    GTK Theme: Adwaita [GTK2/3]
 :-   --------/MMMd-------------;     Icon Theme: Adwaita
 :-    ------/hMMMy------------:      Font: Adwaita Sans 11
 :-- :dMNdhhdNMMNo------------;       Disk: 209G / 3.0T (7%)
 :---:sdNMMMMNds:------------:        CPU: AMD Ryzen 7 7700 8-Core @ 16x 5.39287GHz
 :------:://:-------------::          GPU: AMD Radeon RX 6700 XT
 :---------------------://            RAM: 5518MiB / 31188MiB
```

Congrats!

## Save your setup for next time

Once everything is how you like it, a few commands capture it, so the next
install takes minutes instead of an evening:

```bash
# Every extension's settings (Dash to Dock, Blur my Shell, Vitals…)
dconf dump /org/gnome/shell/extensions/ > extensions.dconf

# Which extensions are installed and enabled
gnome-extensions list --enabled > extensions.txt

# Your Flatpak apps
flatpak list --app --columns=origin,application > flatpaks.txt
```

On the new machine, after installing the same extensions, restore their
settings with:

```bash
dconf load /org/gnome/shell/extensions/ < extensions.dconf
```

> **Careful with GSConnect:** its settings include your paired devices and
> their IDs. Remove the `[gsconnect…]` sections from `extensions.dconf` before
> sharing the file anywhere — you'll re-pair your phone on the new install
> anyway.

I've wrapped all of this — plus the package installs and settings from this
guide — into a personal setup script, so a fresh install is mostly one
command.

## Optional setups

Things only some machines need. Each one says when you'll want it.

### Mounting an extra drive at boot

**You need this if** you have a second internal drive that should always be
available at the same folder.

1. Find the drive's UUID:

   ```bash
   lsblk -f
   ```

2. Open `/etc/fstab` with `sudo` and add a line at the bottom:

   ```text
   UUID=<your-drive-uuid>  /home/<you>/Data  ext4  defaults,noatime  0 2
   ```

   That's the drive, the folder to mount it in, the filesystem and some mount
   options. Create the folder first if it doesn't exist.

3. If the drive is currently mounted under `/media`, eject it. Then reload and
   mount everything from `fstab`:

   ```bash
   sudo systemctl daemon-reload
   sudo mount -a
   # If you get permission errors, take ownership of the folder
   sudo chown -R $USER:$USER /home/$USER/Data
   ```

> **Pitfall:** a mistake in `/etc/fstab` can stop your system from booting.
> `sudo mount -a` mounts everything in the file, so if it runs without errors,
> your new line is fine. For a drive that isn't always connected, add `nofail`
> to the options so a missing drive doesn't hold up boot.

### DisplayLink docks (e.g. Targus)

**You need this if** your dock's monitors stay black — many USB docks use
DisplayLink, which needs a driver and a kernel module (`evdi`).

1. **Disable Secure Boot** in your BIOS. Secure Boot blocks the `evdi` module
   unless you sign it yourself, which is very advanced. If you skip this, the
   install appears to work but the module fails to load with signing errors.
2. **Update and reboot**, so the kernel headers you're about to install match
   the kernel you're running. Then install the build dependencies:

   ```bash
   sudo dnf install kernel-devel-$(uname -r) kernel-headers-$(uname -r) dkms git make gcc libdrm
   ```

3. **Download the driver** for your Fedora version from the
   [displaylink-rpm releases](https://github.com/displaylink-rpm/displaylink-rpm/releases)
   — for example `fedora-43-displaylink-….x86_64.rpm` — and install it:

   ```bash
   sudo dnf install ./fedora-43-displaylink-*.x86_64.rpm
   ```

   This builds the `evdi` module, installs the DisplayLinkManager service and
   sets it to start automatically.

4. **Reboot**, plug in the dock and wait 5–10 seconds. Your external monitors
   should appear in _Settings → Displays_.

### Sunshine game streaming

**You need this if** you want to stream games or your desktop from this PC to
another device on your network, using the
[Moonlight](https://moonlight-stream.org/) app (Fire TV Stick, PS Vita,
Android handhelds, Nintendo Switch and more).

1. Enable the LizardByte Copr repository and install
   [Sunshine](https://github.com/LizardByte/Sunshine):

   ```bash
   sudo dnf copr enable lizardbyte/stable
   sudo dnf install Sunshine
   ```

2. If screen capture doesn't work, give Sunshine permission to capture
   through KMS:

   ```bash
   sudo setcap cap_sys_admin+p $(readlink -f $(which sunshine))
   ```

3. Open `https://localhost:47990` to finish setting it up and pair Moonlight.

> When Fedora 43 was new, only the `lizardbyte/beta` repository had working
> packages for it. That's no longer the case, but if a brand-new Fedora
> release isn't supported yet, the beta repository is worth trying.

### Soundux soundboard

**You need this if** you want a soundboard on Linux — playing sound clips into
games or Discord calls. It can pass audio from one app into another, and plays
any MP3s you add, with no real limit on length.

```bash
sudo dnf copr enable rivenirvana/soundux
sudo dnf install soundux
```
