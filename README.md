# Contact Form

Contact Form is simple configurable web form application for sending information and optional file attachments via email.

# Configuration
There are two configuration files that you will need to modify:

1. Client
In each html top level HTML file, you'll find a variable called "server".  This needs to point to the location of the back end services endpoint.  This location is the url to your application + the string: '/services/public/api'.

2. Server
Inside of the "services" directory, you'll find a hidden configuration file called ".env".  This file contains a series of parameters starting with "MAIL_", for example, "MAIL_HOST", "MAIL_PORT", etc.   Set these values to the appropriate values for the mail server that you would like to use.

<!-- LICENSE -->
## License

Distributed under the permissive MIT license. See the [license](./LICENSE.txt) for more information.

<!-- Acknowledgements -->
## Acknowledgements

This software was created by the Data Science Institute](https://datascience.wisc.edu/) at the [University of Wisconsin-Madison](https://www.wisc.edu/)