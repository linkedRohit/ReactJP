import Notifications from 'react-notification-system-redux';

export const NOTIFY_USER = 'NOTIFY_USER'

const notificationOpts = {
  // uid: 'once-please', // you can specify your own uid if required
  title: 'Refresh Successful',
  message: 'Your job has been refreshed successfully, It will be live in next 60 minutes!',
  position: 'tr',
  autoDismiss: 5/*,
  action: {
    label: 'Click me!!',
    callback: () => alert('clicked!')
  }*/
};

export function notifyUser (notification) {
	console.log(notification, 1231232131231);
	let notificationOptions;
	if(notification) notificationOptions = setNotificationObject(notification);
	else notificationOptions = notificationOpts;
	
	return (dispatch, getState) => {
		dispatch(notifyUserWithOpts(notificationOptions));
	}
}


function setNotificationObject(notification, notificationOptions = notificationOpts) {
	if(notification.title)
		notificationOptions.title = notification.title;
	if(notification.message)
		notificationOptions.message = notification.message;
	if(notification.position)
		notificationOptions.position = notification.position;
	if(notification.autoDismiss)
		notificationOptions.autoDismiss = notification.autoDismiss;
	if(notification.action)
		notificationOptions.action = notification.action;
	return notificationOptions;
}

function notifyUserWithOpts(notOpts) {

	if(typeof notOpts == "undefined") {
		return Notifications.success(notOpts);
	}

	switch (notOpts.type) {
		case "success":
			return Notifications.success(notOpts);
		case "error":
			return Notifications.error(notOpts);
		case "warning":
			return Notifications.warning(notOpts);
		case "info":
			return Notifications.info(notOpts);
		case "info":
			return Notifications.info(notOpts);
		case "show":
			return Notifications.show(notOpts, notOpts.level);
		case "hide":
			return Notifications.hide(notOpts.uid);
		case "removeAll":
			return Notifications.removeAll();
		default:
			return Notifications.success(notOpts);

	}
}