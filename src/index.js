import style from "./scss/style.scss";
import $ from 'jquery';

import {TweenMax, Power2, TimelineLite} from "gsap/TweenMax";

$('#watch-video').hover(()=>{
	$('#watch-video-title').toggleClass('hovered');
});

var  tlPreloader = new TimelineMax({repeat:2,onComplete:loadContent}),
	tlInit = new TimelineMax(),
	tlLoader = new TimelineMax(),
	container = $('.container'),
	overlay = $('#overlay'),
	preloader = $('#preloader'),
	logo = $('#logo'),
	menu = $('#menu'),
	release = $('#release'),
	social = $('#social'),
	watchVideo = $('#watch-video'),
	videoPlayer = $('#video-player'),
	modalOverlay = $('#modal-overlay'),
	interval = .6,
	close = $('#close'),
	oscyllosGrey = $('#oscyllo-grey').children();
 

tlInit
	.set(oscyllosGrey, {autoAlpha:0})
	.fromTo(preloader,1,	{autoAlpha:0}, {autoAlpha:1, ease: Expo.easeIn});

tlPreloader
	.staggerFromTo(oscyllosGrey,0.3,  //0.3
		{autoAlpha:0},
		{autoAlpha:1, ease:Back.easeInOut},
		0.05 //0.05
	)
	.to(oscyllosGrey, .3, {autoAlpha:0})

	

function loadContent() {
	tlLoader
		.fromTo(overlay,.3,	{autoAlpha:1}, {autoAlpha:0, ease: Expo.easeIn}) //2
		.fromTo(container,.3,	{autoAlpha:0}, {autoAlpha:1, ease: Expo.easeIn},'+=-1') //1
		.fromTo(logo,interval,	{autoAlpha:0}, {autoAlpha:1, ease: Expo.easeIn})
		.fromTo(menu,interval,	{autoAlpha:0}, {autoAlpha:1, ease: Expo.easeIn},'+=-0.2')
		.fromTo(release,interval,	{autoAlpha:0}, {autoAlpha:1, ease: Expo.easeIn},'+=-0.2')
		.fromTo(social,interval,	{autoAlpha:0}, {autoAlpha:1, ease: Expo.easeIn},'+=-0.2')
		.fromTo(watchVideo,interval,	{autoAlpha:0}, {autoAlpha:.8, ease: Expo.easeIn},'+=-0.2')
}

var currentMousePos = { x: -1, y: -1 };
    $(document).mousemove(function(event) {
        currentMousePos.x = event.pageX;
        currentMousePos.y = event.pageY;
        // console.log(currentMousePos);
    });

watchVideo.click(()=>{
	tlLoader
		.to(modalOverlay,1,{autoAlpha:1,ease: Expo.easeIn})
		.to(watchVideo,1,{autoAlpha:0, ease: Expo.easeIn},'+=-1')
		.to(videoPlayer,1,{autoAlpha:1,ease: Expo.easeIn},'+=-1')

});

var stopVideo = function ( element ) {
	var iframe = element.querySelector( 'iframe');
	var video = element.querySelector( 'video' );
	if ( iframe ) {
		var iframeSrc = iframe.src;
		iframe.src = iframeSrc;
	}
	if ( video ) {
		video.pause();
	}
};

close.click(()=>{
	stopVideo(document);
	tlLoader
		.to(videoPlayer,1,{autoAlpha:0,ease: Expo.easeIn})
		.to(watchVideo,1,{autoAlpha:1, ease: Expo.easeIn},'+=-1')
		.to(modalOverlay,1,{autoAlpha:0,ease: Expo.easeIn},'+=-1')

});

modalOverlay.click(()=>{
	stopVideo(document);
	tlLoader
		.to(videoPlayer,1,{autoAlpha:0,ease: Expo.easeIn})
		.to(watchVideo,1,{autoAlpha:1, ease: Expo.easeIn},'+=-1')
		.to(modalOverlay,1,{autoAlpha:0,ease: Expo.easeIn},'+=-1')

});