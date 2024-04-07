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

- Book
  - EN
      - _build (Jupyter-book build english book)
  - country-code
      - (jupyter-book build in target language)
        
<b> if using multiple builds at different locations </b>

Add a target link to the languages in the _config.yml
```
languages: [["label", country-code, target], ["nederlands", nl, "http://dutchbook.nl"], ["english", en, "http://englishbook.com"]]
```
where the different translations of the book are hosted at different locations

### Example
A working example can be found <a href="https://luukfroling.github.io/sphinx-translation-button/nl/_build/html/intro.html"> here </a>
