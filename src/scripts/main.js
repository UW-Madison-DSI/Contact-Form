/******************************************************************************\
|                                                                              |
|                                    main.js                                   |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines the top level script of a contact form app.              |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.txt', which is part of this source code distribution.        |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2023, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

$(window).ready(() => {

	//
	// create form fields
	//
	let form = $('.form');
	addFormFields(form, fields);

	//
	// button event handlers
	//

	$('button.select').on('click', (event) => {
		$('#file').trigger('click');
	});

	$('button.remove').on('click', (event) => {
		$('#file')[0].value = null;
		$('#file').hide();
		$('.remove').hide();
	});

	$('.send').on('click', (event) => {
		send(this.getFormData(form, fields), {

			// callbacks
			//
			success: () => {
				alert("Your message has been sent.  Thank you for your feedback!");
			},
			error: () => {
				alert("Sorry - your message could not be sent!");
			}
		});
		event.stopPropagation();
	});

	//
	// file event handlers
	//

	$('#file').on('change', (event) => {
		$('#file').show();
		$('.remove').show();

		// set input filename (required for Safari)
		//
		if (event) {
			if (event.target.files[0]) {
				let filename = event.target.files[0].name;
				setFilename(filename);
			} else {
				setFilename('No file chosen');
			}
		}
	});
});