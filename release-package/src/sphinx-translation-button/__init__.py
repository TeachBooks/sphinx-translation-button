import os
import yaml


from sphinx.application import Sphinx
from sphinx.util.fileutil import copy_asset_file


def copy_buttons(app: Sphinx, exc: None) -> None:
    print("[sphinx-translation-button] build completed, adding directories.")

    # directory paths 
    current_directory = os.path.dirname(__file__)
    static_directory = os.path.join(app.builder.outdir, '_static')

    package_js_file = os.path.join(current_directory, 'static', 'package_translation_button.js')
    user_js_file = os.path.join(current_directory, 'static', 'user_translation_button.js')

    if app.builder.format == 'html' and not exc:

        # Read the existing content of the JavaScript file
        with open(package_js_file, 'r') as package_js:
            existing_content = package_js.read()
        
        with open(user_js_file, 'a+') as user_js:
            user_js.seek(0)  # Move the cursor to the beginning of the file
            user_js.truncate()  # Truncate the file, removing all content	

        # Concatenate the variable assignment with the existing content
        new_content = createVariable(os.path.join(app.builder.srcdir, '_config.yml')) + existing_content

        # Write the modified content back to the JavaScript file
        with open(user_js_file, 'w') as js_file:
            js_file.write(new_content)
        
        # Copy all files from static to output directory
        copy_asset_file(user_js_file, static_directory)

        print("[sphinx-translation-button] copied user file to _static directory.")
        
def createVariable(file_name: str) -> str:
    # Read yaml file
    with open(file_name, 'r') as file:
        data = yaml.load(file, Loader=yaml.FullLoader)
        languages = data['languages'] if 'languages' in data else print('\033[91m' + " [sphinx-translation-button] build failed due to missing languages in _config.yml. Please add languages to _config.yml. "+ '\033[0m')

    # check against first language
    [print('\033[91m' + " [sphinx-translation-button] Not all languages contain all necessery arguments "+ '\033[0m') for language in languages if len(language) != len(languages[0])] 
    
    # Compose result_languages using list comprehension and join
    result_languages = f"let _languages = [{', '.join([f'{language}' for language in languages])}]"
    print("[sphinx-translation-button] adding languages : ", languages)
    
    return result_languages + "\n\n"

   

    

def setup(app: Sphinx) -> dict[str, str]:
    app.add_js_file('user_translation_button.js')

    print("added this file", 'user_translation_button.js')
    app.connect('build-finished', copy_buttons)
    return {'parallel_read_safe': True, 'parallel_write_safe': True}
