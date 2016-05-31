# advantis-credit-union-bookmarklet

Quick and dirty bookmarklet to tag all currently visible transactions.

Advantis's web UI only lets you tag one transaction at a time, and each time you do, you must reselect the category. I got tired of that pretty quickly and started using jQuery in the browser console... but I kept having to look up category IDs. I got tired of _that_ too, so I wrote this script.

Run this as a bookmarklet on a transaction search results page showing transactions that you want to categorize as the same thing.

When run, this will display a really terrible-looking modal dialog that lets you select a category. When you select one, boom, every transaction on the page will get categorized.

TODO: Add a script to bookmarkletify this thing! (i.e. `javascript:<all the code in one line>`)
