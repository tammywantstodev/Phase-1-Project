#Ingredient Recipe Generator
The program generates recipes based off of ingredients a user inputs. It generates
up to 10 recipe cards with images and instructions that the user can follow to
recreate the recipes. Additionally, the program features a ``favorites`` section.
Users can save recipe titles here and then access them in future by clicking on
them which generates one specific recipe card. Additionally, they can remove the
recipes from this section whenever they wish.

##index.html
This files contains the basic structure that will dictate how the data is laid out.
It has all the element tags that are like placeholders that'll come in handy later
on when the ``DOM`` is brought in to display data from the API on the web-page. It
also is where the ``form``  for the user to input their ingredients is created.

##index.css
This is where almost all the styling for the webpage is done. From the text in the
``HTML`` file to the data that'll be brought in from the API. The content in this
file ensures that the retrieved API data is displayed in an aesthetically pleasing
way with the use of different colouring, fonts and properties like ``flex-box``.
It also adds a few dynamic features to elements on the page such as hovering, scaling
and hiding sections like the favourites menu.

##rec.js
The file contains all the functionality that enables ``communication between the API and web page``
as well as ``behavioural features`` like collapse functionality for the favourites menu. Data inputted
into the form by users is used to request related data from the API and then the results from these
requests are displayed on the page. There are also various functions to handle the favourites section.
Adding recipes to favorites and seeing their titles being listed in the side menu. Clicking on titles
in said menu generates title specific recipe cards on the main page. Additionally, a button to remove
favorited titles from the favorites menu. All these are done using ``localStorage`` to ensure that 
changes persist even after a user exits the page (session).

##Prerequisites
Node.js installed on your machine
Clone the repository into your coding environment ``git clone <SSH KEY>``
Run the html file on a browser


###Author: Tamara Kaka