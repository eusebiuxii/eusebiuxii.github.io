---
title: New Brighton Murals
description: An iOS app that maps the murals of New Brighton, fetching them from an API and sorting them by distance.
date: 2022-12-15
tags: [ios, swift, xcode, mapkit]
cover: ./covers/new-brighton-murals.webp
repo: https://github.com/eusebiuxii/NewBrightonMurals
featured: true
---

## Idea & introduction

This app was made for a university assignment. It retrieves data from an API
in the form of JSON and puts the data into custom objects called murals.

Each mural has a title, artist, latitude and longitude, thumbnails and other
details. The app places them on a map and in a table, letting the user access
more details about each one.

## Documentation & coding

The app targets iOS 16.0, so I used Xcode and Swift. Fetching data from the
specific URL, putting it into the correct objects and displaying it to the user
made up most of the project. The rest was polishing and adding features, as
well as simulating a walk using a GPX file so I could test it.

I also made a one-page document detailing how the interface works, although I
trust that the interface is fairly intuitive.

## Technologies used

- Xcode IDE, coded using Swift with the interface made in Storyboard
- A custom API, as this was made for an assignment
- Decoding objects from JSON data
- The map is provided by MapKit and CoreLocation
- The user "walking" is simulated using a GPX file

## Notable features

- Mural objects are fetched from a custom API
- A map shows the location of the murals and the user, along with a table of
  those murals
- Each mural is annotated on the map and listed in the table
- The table is ordered by the distance between the user and each mural
- The user can see details about each mural, such as the title, artist, info
  and images
- Mural images are animated, switching every couple of seconds

## Files

The code is in the
[GitHub repository](https://github.com/eusebiuxii/NewBrightonMurals), and
there's a [one-page document](/documents/new-brighton-murals-explained.pdf)
(PDF) explaining how the interface works. Keep in mind the app can only be run
on macOS, and it is not available on the App Store.
