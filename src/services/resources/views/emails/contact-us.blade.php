<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Contact Us</title>
	<style>
		body {
			font-family: sans-serif;
		}
	</style>
</head>
<body>
	@foreach ($params as $key => $value)
	@if ($key != 'attachment')
	{{ ucwords(str_replace('_', ' ', $key)) }}: {{ $value }} <br />
	@endif
	@endforeach
	<br />
	<br />
	Sent from {{ $app_name }}.
</body>
</html>