(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-88261541-1', 'auto');
// ga('send', 'pageview');
// google Analytics END===========

function gapage(page) {
	ga('send', 'pageview', page);
	// console.log('page view: ' + page);
}

function gaclick(evt) {
	ga('send', 'event', 'click', evt);
	// console.log('click: ' + evt);
}

function trackWaitJump(someurl, url){
	setTimeout(function(){
		location.href = url;
	},100);
	gaclick(someurl);
}

