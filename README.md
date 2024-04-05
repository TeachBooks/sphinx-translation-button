# Sphinx-translation-button 
Switch between languages in a jupyter-book using a launch button (<a href="https://luukfroling.github.io/sphinx-translation-button/nl/_build/html/intro.html"> example </a>)

## Package
### Installation
```
pip install sphinx-translation-button
```

### Usage

Add to _config.yml
```
languages: [["label", country-code], ["nederlands", nl], ["english", en]]
```

<b> if using sphinx internationalization </b> 

(based on <a href="https://www.sphinx-doc.org/en/master/usage/advanced/intl.html"> sphinx internationalization </a>)
For the translation button to work the build output needs to be configured as follows: 

├── book
│   ├── en
│   │   ├── (Jupyter-book build english book)
│   ├── nl
│   │   ├── (Jupyter-book build dutch book)
│   ├── country-code
│   │   ├── (Jupyter-book build in language)

### Example
A working example can be found <a href="https://luukfroling.github.io/sphinx-translation-button/nl/_build/html/intro.html"> here </a>

## Internationalization jupyter-book 
(based on <a href="https://www.sphinx-doc.org/en/master/usage/advanced/intl.html"> sphinx internationalization </a>)


- Book
  - EN
      - (Jupyter-book build english book)
  - NL
      - (Jupyter-book build dutch book)
  - ETC
      - etc

  which can be done by following the instructions <a href="https://www.sphinx-doc.org/en/master/usage/advanced/intl.html"> here </a>. An example can be found in the 'example-book' subdirectory. 

