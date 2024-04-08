# Internationalization walkthrough

1) ### Setup
   open a cmd prompt in the directory of the jupyter-book
3) ### Add extension to _config.yml
   Add to _config.yml :
   ```
   sphinx: 
	  extra_extensions:
       - sphinx-translation-button
   ```
4) ### Create config.py
   In the cmd, run :
   ```
   jb config sphinx .
   ```
   Note that the . refers to the current jupyter-book directory. 
5) ### Get textfiles
   In the cmd, run :
   ```
   sphinx-build -M gettext . .
   ```
   This wil generate in the current directory a folder called gettext, containing pot files related to the text in the jupyter-book.
6) ### Translate .pot files to .po files
   Translate the .pot files. One way to do this is to provide all the text inside the file to chatGPT and ask it to convert it to a .po file.
   Do this for every language the book needs to be translated to.
   Add these files back to the gettext folder under the name "{country_code}_{original_name}.po. intro.pot -> en_intro.po, nl_intro.po
7) ### Use custom code to convert .po to .mo files
   Copy the script called poToMo.py and place it in the root folder of the jupyter-book. Now run
   ```
   python poToMo.py "gettext/nl_intro.po" "locale/nl/LC_MESSAGES/intro.mo"
   ```
   keep in mind to change the country codes accordingly.
8) ### add languages to _config.yml
   ```
   sphinx:
	  extra_extensions:
	    - sphinx-translation-button
	  config:
	    language: nl
	    locale_dirs: ['locale/']
   languages: [["nederlands", nl], ["english", en]]
   ```
   keep in mind what countrycode is added to sphinx -> config -> language as we will change this depending on the build version of the book in the next step
9) ### Build book in first target language
   Build the book in the first language by running
   ```
   jb build . --path-output build/nl
   ```
10) ### Build book in other languages
    Then, per build change the country code in the config file :
    ```
    sphinx:
	   extra_extensions:
	     - sphinx-translation-button
	   config:
	     language: en # nl changed to en
	     locale_dirs: ['locale/']
    languages: [["nederlands", nl], ["english", en]]
    ```
    And change the command to build the book as well
    ```
     jb build . --path-output build/en
    ```
    
11) ### Run book by navigating to the index.html located in the book/en/_build/html... directory!
	
	


    
   
