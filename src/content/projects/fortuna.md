---
title: Fortuna
description: A word-guessing game for iOS built in Xcode and Swift, inspired by the Wheel of Fortune show.
date: 2022-11-23
tags: [ios, swift, xcode, game-dev]
cover: ./covers/fortuna.webp
repo: https://github.com/eusebiuxii/Fortuna
---

## Idea & introduction

This project was part of a university module. It consisted of designing and
making an iOS application in Xcode, coded in Swift. The design of the UI and
the flow of the application had to be taken into account, as well as the
colour schemes, fonts and so on.

The game picks a random phrase from a JSON file which stores different phrases
and genres, similar to Wheel of Fortune. The phrase is shown to the player with
its letters hidden. The player can guess a single letter or the whole phrase,
but they only have 10 lives to guess the full phrase. They rack up points for
each letter they guess, and extra points for each letter they reveal by
guessing the full phrase. Their score is then stored on a sorted leaderboard.

## Technologies used

- Xcode IDE, coded using Swift with the interface made in Storyboard
- Decoding objects from JSON data files
- Scores are stored in a table

## Notable features

- A random phrase is picked from the JSON files
- Players can guess a single letter or the whole phrase
- Players gain more points for guessing the full phrase earlier in the game
- The game finishes when the player guesses the full phrase or runs out of
  lives
- High scores are stored in a table, sorted from highest

## Conclusion

App development is a field I am very interested in, and doing projects like
these for my degree gives me even more of a reason to spend hours on them. I
try to make them a good experience for anyone who tries them out. _Fortuna_ was
a great way to start iOS development, but I want to try developing for other
platforms, such as Android, in future projects.

## Files

The files are available on [GitHub](https://github.com/eusebiuxii/Fortuna),
though the project can only be edited and run on macOS. The game is **not**
available on the App Store. There is also a
[short document](/documents/fortuna-explained.pdf) (PDF) explaining what each
part of the UI does, in case it isn't intuitive.
