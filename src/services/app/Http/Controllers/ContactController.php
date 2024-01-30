<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Http\Controllers\Controller;

class ContactController extends Controller
{
	/**
	 * Create a new contact submission.
	 *
	 * @param Illuminate\Http\Request $request - the Http request object
	 * @return object
	 */
	public function postCreate(Request $request) {

		// parse parameters
		//
		$params = $request->all();
		$subject = 'Contact Form';
		$attachment = $request->file('attachment');

		// return error if email is not enabled
		//
		if (!config('mail.enabled')) {
			return response("Email has not been enabled.", 400);
		}
		
		// send email
		//
		Mail::send('emails.contact-us', [
			'params' => $params,
			'app_name' => config('app.name'),
		], function($message) use ($subject, $attachment) {
			$message->to(config('mail.contact.address'));
			$message->subject($subject);

			// add attachment
			//
			if ($attachment) {
				$message->attach($attachment->getRealPath(), array(
					'as' => $attachment->getClientOriginalName(),
					'mime' => $attachment->getMimeType())
				);
			}
		});

		// return sent information
		//
		return $params;
	}
}