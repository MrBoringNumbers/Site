let elements = document.querySelectorAll('.animate_observer')

// Check for broswer support. If none, reset elements waiting for observer.
if (window.IntersectionObserver) {

	function observer_callback(e) {
		e.forEach(function (item, index) {
			if (e[index].isIntersecting) {
				e[index].target.style.animationPlayState = 'running';
			}
		})
	}

	let observer = new IntersectionObserver(observer_callback, {threshold:0.5});
	elements.forEach(function (item, index) {
		observer.observe(item)
	})

}

else {

	elements.forEach(function (item, index) {
		console.log(item)
		item.style.animation = 'none'
	})

}