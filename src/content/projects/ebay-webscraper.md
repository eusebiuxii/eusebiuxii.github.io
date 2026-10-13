---
title: WebScraper
description: A simple web scraper made using Python and the Beautiful Soup package, pulling eBay listings into Excel.
date: 2022-10-17
tags: [python, beautiful-soup, web-scraping]
cover: ./covers/ebay-webscraper.webp
repo: https://github.com/eusebiuxii/ebay-webscraper
---

## Idea & introduction

This project was done in my spare time, as I had been interested in coding a
web scraper for some time. I looked at a few websites but ended up choosing
eBay as my scraping target. The idea was simple: build a program to grab
product information from eBay and put it in an Excel file.

There are multiple ways to do this, but I decided on using Python and a popular
package named Beautiful Soup. This package makes it far easier to parse HTML
and XML documents and extract the data.

## Technologies used

- Developed using Python
- Beautiful Soup handles pulling the data out of the HTML and XML
- Data is stored in an Excel file

## Notable features

- The code takes no input from the user to run
- The scraper is tailored to scrape data from a specific URL
- You can change the number of pages to scrape data from

## Conclusion

A small project, but it definitely helped with learning more about HTML and XML
structures, as well as retrieving data from the web. It had been a while since
I'd worked with Python, so this project was a good way to reintroduce myself to
the language. I plan on building a better frontend for it, as I haven't done UI
in Python yet.

## Files

The code is available in a
[GitHub repository](https://github.com/eusebiuxii/ebay-webscraper). There is no
documentation to go with it, as the project is not the same size as some of the
others, but it has comments throughout the code explaining what each part does.
