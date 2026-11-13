---
title: Setup Switcher
description: A GNOME extension that switches displays, audio and launch commands from Quick Settings, made for a desk and TV gaming PC.
date: 2026-11-11
tags: [gnome, javascript, gjs, linux, d-bus]
cover: ./covers/setup-switcher.webp
repo: https://github.com/eusebiuxii/setup-switcher-gnome-extension
aiAssisted: true
---

## Idea & introduction

My gaming PC is connected to two monitors at my desk and, through an HDMI
output, to a TV. Going from the desk to the couch meant turning screens on and
off, changing the audio output and opening Steam Big Picture. I had been doing
this with a few commands behind a button that toggled between two states, which
worked but was fiddly and only covered two layouts.

Setup Switcher replaces that with a GNOME Shell extension. You save each setup
once (for example Desk, TV, Desk + TV or Couch Gaming) and then switch between
them from a tile in Quick Settings, next to Wi-Fi and Bluetooth. Picking a setup
applies it straight away: the right screens turn on or off, the sound moves to
the right device, and any command you attached to the setup runs.

## Technologies used

- Written in JavaScript (ES modules) for GJS, the JavaScript runtime GNOME Shell
  uses, targeting GNOME 47 to 51
- Mutter's `org.gnome.Mutter.DisplayConfig` D-Bus API to read and apply monitor
  layouts
- `pactl` (PipeWire or PulseAudio) to switch the audio output and sound card
  profile
- GTK 4 and libadwaita for the settings window
- GSettings to store the setups and preferences

## Notable features

### What a setup remembers

- Which screens are on, plus their resolution, refresh rate (including VRR),
  scale, rotation, position, primary screen and HDR colour mode
- An audio output, so the TV setup can send sound to the TV and the desk setup
  to speakers or a headset
- An optional command to run when switching to the setup and another for
  switching away, for example `steam steam://open/bigpicture` and
  `steam steam://close/bigpicture`

### Switching safely

GNOME's own "Keep these display settings?" dialog appears after a switch. If
the change is reverted, or nobody answers before the countdown ends, the screens
go back and the audio and commands are left alone. They only run once the change
is kept. The dialog can be turned off for instant switching.

Setups whose screens aren't plugged in, such as when the TV is off, are greyed
out in the menu or can be hidden completely, so you can't switch to a layout
with no visible screen.

Screens are recognised by the make, model and serial number they report, not by
the port they are plugged into. A setup keeps working if a cable moves to a
different port, and the port name is only used to tell two identical monitors
apart.

### Audio that waits for the TV

HDMI audio devices often only appear after the screen turns on. The extension
retries for a few seconds and, if the output still isn't there, switches the
sound card to the profile that was in use when the setup was saved.

### Login behaviour

A setup can be applied automatically when you log in. You can pick a specific
setup or choose to remember the one you were using when you last shut down.

### Settings window

The settings window has two tabs. **Setups** shows the current screens, saves
the current layout as a new setup with its audio output and commands, and lets
you rename, edit, overwrite, reorder or delete existing setups. **Behavior**
holds the login setup, the confirmation dialog and the option to hide
unavailable setups.

## Challenges

The trickiest part was knowing whether a display change was kept or reverted.
GNOME Shell doesn't announce the outcome of its confirmation dialog, so the
extension wraps the function the dialog calls when you press a button, with a
timeout as a fallback. That way, reverting a layout never launches Big Picture
or moves the audio.

Testing a multi-monitor tool on a laptop with one screen was another problem. I
ran a separate headless GNOME Shell with two virtual monitors and its own
settings folder. That let me run real switches, confirmations, reverts and
login behaviour without touching my own desktop.

## Conclusion

This was my first GNOME extension and my first time using GJS. It taught me how
GNOME Shell is put together, how desktop components talk to each other over
D-Bus, and how audio routing works with PipeWire. It is also a tool I will use
every day: going from the desk to the couch is now one click.

## Files

The code is available in a
[GitHub repository](https://github.com/eusebiuxii/setup-switcher-gnome-extension),
including a README with install steps. With the repository cloned, it installs
with:

```bash
make install
# log out and back in, then:
make enable
```
