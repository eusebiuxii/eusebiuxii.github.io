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

> Written for **Fedora 43 with GNOME 49**, and checked again on a fresh
> **Fedora 45 (GNOME 51)** laptop install. Most of it applies to other recent
> versions too, but menu names and package versions shift over time.

> **About the commands:** I use terminal commands a lot in this guide because
> they're quicker to copy and paste than clicking through menus. You don't
> have to use them, though. Most changes can be made in Settings or an app's
> preferences, and files can be extracted from the Files app. Doing it by hand
> is easy enough to work out, so I don't explain every click.

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

### Terminal: copy and paste with Ctrl + C and Ctrl + V

Fedora's Terminal (Ptyxis) uses **Ctrl + Shift + C / V / A** for copy, paste
and select all, because Ctrl + C traditionally stops the running command. If
you're used to Windows, switch them to plain **Ctrl + C / V / A**: open the
Terminal menu (☰) → _Preferences → Shortcuts_ and set _Copy_, _Paste_ and
_Select All_, or run:

```bash
gsettings set org.gnome.Ptyxis.Shortcuts copy-clipboard '<Control>c'
gsettings set org.gnome.Ptyxis.Shortcuts paste-clipboard '<Control>v'
gsettings set org.gnome.Ptyxis.Shortcuts select-all '<Control>a'
```

> **Check Ctrl + C still stops commands:** with nothing selected, run
> `sleep 30` and press Ctrl + C. It should stop straight away. If it doesn't,
> set _Copy_ back to Ctrl + Shift + C (or set it to `''` to reset it).
>
> You also lose two lesser-known terminal shortcuts: Ctrl + A (jump to the
> start of the line — use **Home** instead) and Ctrl + V (type the next key
> literally).

### Templates for right-click → New Document

On Windows, right-clicking a folder gives you _New → Text Document, Word
Document…_. GNOME's Files app has the same _New Document_ menu, but it only
appears once there's something in your **Templates** folder, and Fedora ships
it empty.

Every file you put in `~/Templates` becomes an entry in that menu, named after
the file. I've made a starter set: a blank document, spreadsheet and
presentation (OpenDocument, so they open in LibreOffice or OnlyOffice), plus a
text file, Markdown file, shell script and web page.
[Download the templates](/downloads/fedora-templates.zip) (ZIP) and extract
them into your Templates folder:

```bash
unzip ~/Downloads/fedora-templates.zip -d ~/Templates
```

Then right-click empty space in any folder → **New Document**. Add or rename
files in `~/Templates` to make the menu your own — anything you save there,
even a filled-in letterhead or invoice, becomes a template.

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
  - _Behaviour → Scroll action:_ **Switch workspace** — scroll over the dock
    to move between workspaces. Very handy with a mouse and multiple
    desktops.
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

To make Clipboard History work like Windows' `Win + V`, it needs GNOME's
Super + V shortcut. Do this in two steps:

1. **Free up Super + V.** GNOME uses it (and Super + M) for **Show the
   notification list**. Go to _Settings → Keyboard → View and Customise
   Shortcuts → System → Show the notification list_ and remove it, or from
   the terminal:

   ```bash
   # Remove the shortcut entirely (the notification list is still a click on the clock)
   gsettings set org.gnome.shell.keybindings toggle-message-tray "[]"

   # …or keep Super + M for it
   gsettings set org.gnome.shell.keybindings toggle-message-tray "['<Super>m']"
   ```

2. **Give it to the extension.** In Clipboard History's settings, set
   _Toggle the menu_ to **Super + V**, or:

   ```bash
   dconf write /org/gnome/shell/extensions/clipboard-history/toggle-menu "['<Super>v']"
   ```

> **Pitfall:** if you skip step 1, Super + V keeps opening the notification
> list and the extension's shortcut silently does nothing.

While you're in its settings, I raise the history size (mine keeps 3000
items) and widen the menu a little (43% of the screen), so long copied lines
are readable.

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

### Organising the app grid into folders

Between Fedora's own apps and everything above, the app grid fills up fast.
Group the apps into folders: drag one app onto another to make a folder, then
open it and click its name to rename it. Fedora already comes with
**Utilities** and **System** folders, and Alphabetical App Grid keeps
everything sorted.

A good starting set of folders:

| Folder        | What goes in it                                                                          |
| ------------- | ---------------------------------------------------------------------------------------- |
| Office        | OnlyOffice or LibreOffice, Text Editor, Document Viewer, Document Scanner, Calendar, Contacts |
| Code          | VSCodium, Postman, draw.io, Boxes (virtual machines)                                     |
| Internet      | Brave, Firefox, Betterbird, Discord, LocalSend                                           |
| Media         | VLC, Stremio, Video Player, Audio Player, Image Viewer, Camera, OBS, Kdenlive, GIMP      |
| Games         | Steam, plus any launchers or emulators                                                   |
| Customisation | Extension Manager, Extensions, Tweaks, Flatseal — anything that changes how the system looks or behaves |
| Utilities     | Calculator, Characters, Clocks, Weather, Maps, Fonts, Connections, Fedora Media Writer, Help |
| System        | System Monitor, Disks, Disk Usage Analyser, Logs, Parental Controls                      |

<details>
<summary>Example: how my laptop is set up</summary>

**Dock:** Files, Software, Brave, Steam, VSCodium, Discord, Terminal

| Folder       | Apps                                                                                                                                                           |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Accessories  | Extension Manager, Tweaks                                                                                                                                      |
| Default Apps | Audio Player, Calendar, Camera, Clocks, Contacts, Fedora Media Writer, Files, Help, Image Viewer, Maps, Settings, Software, Video Player, Weather               |
| Dev Work     | Boxes, Characters, Connections, Fonts, Text Editor, VSCodium                                                                                                   |
| Games        | Steam, Stardew Valley                                                                                                                                          |
| Office       | OnlyOffice, Document Viewer, Document Scanner                                                                                                                  |
| System       | Disk Usage Analyser, Disks, Logs, Parental Controls, System Monitor                                                                                            |

Everything I use often lives in the dock, so the folders are mostly for
tidying away Fedora's built-in apps.

</details>

> **Folders are for tidying, not finding.** Put the apps you use every day in
> the dock (right-click an app → _Pin to Dash_) so they're one click away.
> When you're after anything else, press the **Super** key and start typing
> its name — that's almost always quicker than opening the app grid and
> digging through folders. With GNOME Fuzzy App Search on, small typos still
> find the right app.

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

### Claude Code in the terminal

**You need this if** you want an AI assistant that works in your terminal and
your project folders: it can read and edit your code, run commands, and help
set up the system itself. It needs a Claude subscription or an Anthropic API
account.

Install it with Anthropic's installer. Nothing else is needed, and it keeps
itself up to date:

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

Then open a new terminal, go to a project folder and start it:

```bash
cd ~/Projects/my-site
claude
```

The first run opens your browser to sign in. After that, just describe what
you want in plain English. Run `claude --version` to check it installed.

> **Pitfall:** the installer puts `claude` in `~/.local/bin`. Fedora adds
> that folder to your `PATH` by default, but only for new terminals — if you
> get _"command not found"_, close the terminal and open a new one.

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
