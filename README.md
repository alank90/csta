# THE CSTA Signup Web Site

This web site is written in plain vanialla javascript and uses
the [Stein library](https://steinhq.com/) to create an API
for your google sheet.

The app uses Vite to build the site and Auth0 for authentication [Auth0](https://manage.auth0.com/dashboard/us/movieapi/).

**_Notes_** :

-   You need to create an .env file
-   The .env file should include the stein API url endpoint(VITE_STEIN_URL),the Auth0 domain and Client ID for the csta app.
-   Within the file define keys **VITE_STEIN_URL = \<stein url\>**, **VITE_AUTH0_DOMAIN = domain**, and **VITE_CLIENT_ID = clientid**.
-   The Auth0 key values for domain and clientid can be found at [Auth0 app settings](https://manage.auth0.com/dashboard/us/movieapi/applications/m0LSndkFTL2ZsUp4mD3zXlIldpP9qa1K/settings)
-   The whitelist rules can be found at [CSTA Whitelist](https://manage.auth0.com/dashboard/us/movieapi/rules/rul_aZk5fO8kfjrbvKPY)
-   The app is deployed to [Netlify](https://app.netlify.com/teams/akillian90/overview).
-   Remember to add the three environment variables(VITE_STEIN_URL etc...) to the Netlify app via the Dashboard.
