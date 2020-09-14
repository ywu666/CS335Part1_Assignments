## BACKGROUND ##
Dunedin Dairy sells dairy products. You can go visit them in Dunedin, or you can order their products online from the comfort of your home (or beach or wherever). The shop uses a service-oriented architecture with a customer-facing UI front-end, and a service back-end

This assignment looks at the separation of data from the UI, and how such data can be consumed and used in the end-user application. A later assignment will also explore potential vulnerabilities that could arise when such an architecture is poorly implemented.

A small number of data sources that supply key information content from the shop have been identified. These data sources enable separation of information content from the presentation.

Note that the application you create here will not allow a user to buy any product. Buying products will require a user to register and authenticate. We will defer this to a later assignment.

### Dunedin Dairy ###

You are now ready to build the real application consuming the data offered at http://redsox.uoa.auckland.ac.nz/ds/DairyService.svc/help . 
You may use the shop logo available at http://redsox.uoa.auckland.ac.nz/ds/logo.svg as you deem fit. 
A smaller PNG variant of the logo is available at http://redsox.uoa.auckland.ac.nz/ds/logo-192x192.png .

Firstly, study the supplied endpoints and data sources carefully. 
You can experiment with the endpoints and sources using your browser and the inspection tools available with your browser 
(e.g., Web Inspector on Safari, or F12 on Firefox, Chrome and Edge).

**The application should consist of the following logical sections:**

🏠 *Home* \
This section is the landing place containing an introduction to the shop. Think of something attractive to say about the shop.
\
\
🛒 *Products* \
This section contains the products available in the shop. The display list could grow large, so you will need to have a search bar to dynamically shrink the list. There is an endpoint to support this.
\
\
📌 *Location* \
This section is to show a location map as well as the address and contact details of the physical shop. The location map is provided at http://redsox.uoa.auckland.ac.nz/ds/map.png so that you can simply link to it.
\
\
📰 *News* \
This is the news feed from Dunedin Dairy.

📖 *Guest Book* \
This is where guest comments can be entered into.

The application should use a combination of HTML, CSS, and JavaScript. Where the application needs icons, please consider using an appropriate Unicode character 
that represents the icon. For example, the icons used in this specification are all Unicode characters.

**Please note the following requirements.**

1. You are not allowed to use any libraries or frameworks. (Why oh why?)
2. The application should contain a single HTML page (named UPI.html) where UPI is your personal login name (such as jbon007).
3. The application should work on any modern browser (such as Chrome, Safari and Edge).
4. The application should work on small screen devices. You can test this by making your browser window narrow.

This application should be of a professional quality to attract full marks. You should pay attention to details.
