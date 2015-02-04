# DOM Difference

### Script specially developed for UA Web Challenge in category JavaScript Developer.

The function 'diff' compares a two DOM element with id="before" and id="after". If the fragments has differences:

1. Elements is equals. Highlighting blue colors;
1. Tag elements is equals, but contains text difference. Highlighting yellow color;
1. Tag element exist is in the identificator name 'after', but not exist in the identificator with name 'before'.  Highlighting green color;
1. Tag element exist is in the identificator name 'before', but not exist in the identificator with name 'after'.  Highlighting red color;

For using the function is need to include file 'diff.js' at html file. The function returns is array changes.
