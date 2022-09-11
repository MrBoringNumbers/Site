var startTime = new Date().getTime();
window.ImageSupport = window.localStorage.getItem('Image_Support')

if (window.ImageSupport) {
	console.log('Detected next-gen format support (Storage):', window.ImageSupport)
	document.documentElement.classList.add(window.ImageSupport)
}

else {
	var test_img = new Image()

	function setValue(value) {
		console.log('Detected next-gen format support:', value, new Date().getTime() - startTime)
		document.documentElement.classList.add(value)
		window.ImageSupport = value
		window.localStorage.setItem('Image_Support', value)
	}

	function Check_Webp_Support(event) {
		test_img.onload = function() {setValue('webp')}
		test_img.src = "data:image/webp;base64,UklGRhIAAABXRUJQVlA4TAYAAAAvQWxvAGs="
	}

	test_img.onerror = Check_Webp_Support
	test_img.onload = function() {setValue('avif')}
	test_img.src = "data:image/avif;base64,AAAAHGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZgAAAPBtZXRhAAAAAAAAAChoZGxyAAAAAAAAAABwaWN0AAAAAAAAAAAAAAAAbGliYXZpZgAAAAAOcGl0bQAAAAAAAQAAAB5pbG9jAAAAAEQAAAEAAQAAAAEAAAEUAAAAFQAAAChpaW5mAAAAAAABAAAAGmluZmUCAAAAAAEAAGF2MDFDb2xvcgAAAABoaXBycAAAAElpcGNvAAAAFGlzcGUAAAAAAAAAAQAAAAEAAAAOcGl4aQAAAAABCAAAAAxhdjFDgQAcAAAAABNjb2xybmNseAABAAEAAQAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB1tZGF0EgAKBxgADlgICAkyCB/xgAAghQm0"
}