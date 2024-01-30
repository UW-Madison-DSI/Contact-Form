/******************************************************************************\
|                                                                              |
|                                   forms.js                                   |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a set of utilities for dynamically creating forms.       |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.txt', which is part of this source code distribution.        |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2023, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

//
// form creation methods
//

function addInput(form, name, options) {
	let template = _.template(`
		<div class="<%= name %> form-group">
			<label class="required control-label">
				<i class="<%= options.icon %>"></i>
				<%= options.label %>
			</label>
			<div class="controls">
				<input type="text" class="required form-control" placeholder="<%= options.placeholder %>" />
			</div>
		</div>
	`);
	let html = template({
		name: name,
		options: options
	});
	let element = $(html);
	$(form).append(element);
}

function addTextArea(form, name, options) {
	let template = _.template(`
		<div class="<%= name %> wide form-group">
			<label class="required control-label">
				<i class="<%= options.icon %>"></i>
				<%= options.label %>
			</label>
			<div class="controls">
				<textarea class="required form-control" rows="<%= options.rows || 10 %>" placeholder="<%= options.placeholder %>"></textarea>
			</div>
		</div>
	`);
	let html = template({
		name: name,
		options: options
	})
	$(form).append($(html));
}

function addSelect(form, name, options) {
	let template = _.template(`
		<div class="<%= name %> form-group">
			<label class="required control-label">
				<i class="<%= options.icon %>"></i>
				<%= options.label %>
			</label>
			<div class="controls">
				<select class="form-control">
					<% for (i = 0; i < options.options.length; i++) { %>
					<option><%= options.options[i] %></option>
					<% } %>
				</select>
			</div>
		</div>
	`);
	let html = template({
		name: name,
		options, options
	});
	$(form).append($(html));
}

function addAttachment(form, name, options) {
	let template = _.template(`
		<div class="<%= name %> form-group">
			<label class="control-label">
				<i class="fa fa-file"></i>
				<%= options.label %>
			</label>
			<div class="controls" style="display:flex">
				<input type="file" id="file" class="form-control" />
				<button class="remove btn btn-sm" style="margin-left:10px; display:none"><i class="fa fa-xmark"></i></button>
			</div>
		</div>
	`);
	let html = template({
		name: name,
		options, options
	});
	$(form).append($(html));
}

function addFormFields(form, fields) {
	let keys = Object.keys(fields);
	for (let i = 0; i < keys.length; i++) {
		let key = keys[i];
		let value = fields[key];

		switch (value['type']) {
			case 'input':
				addInput(form, key, value);
				break;
			case 'textarea':
				addTextArea(form, key, value);
				break;
			case 'select':
				addSelect(form, key, value);
				break;
			case 'attachment':
				addAttachment(form, key, value);
				break;
		}
	}
}

//
// getting methods
//

function getFormData(form, fields) {
	let data = {};

	// get form field values
	//
	let keys = Object.keys(fields);
	for (i = 0; i < keys.length; i++) {
		let key = keys[i];
		let options = fields[key];
		switch (options.type) {
			case 'input':
				data[key] = $(form).find('.' + key + ' input').val();
				break;
			case 'textarea':
				data[key] = $(form).find('.' + key + ' textarea').val();
				break;
			case 'select':
				data[key] = $(form).find('.' + key + ' select').val();
				break;
			case 'attachment':
				data[key] = $(form).find('.' + key + ' #file')[0].files[0];
				break;
		}
	}

	return data;
}

//
// setting functions
//

function setFilename(filename) {
	const fileInput = this.$el.find('#file')[0];

	// Help Safari out
	//
	if (fileInput.webkitEntries.length) {
		fileInput.dataset.file = filename;
	}
}

//
// form submission functions
//

function send(data, options) {

	// create form data
	//
	let formData = new FormData();
	let keys = Object.keys(data);
	for (let i = 0; i < keys.length; i++) {
		let key = keys[i];
		let value = data[key];
		formData.append(key, value);
	}

	$.ajax({
		type: 'POST',
		url: server + '/contacts',
		data: formData,
		contentType: false,
		processData: false,
		success: options.success,
		error: options.error
	});
}