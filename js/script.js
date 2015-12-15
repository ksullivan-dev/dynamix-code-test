
var containerClass;
$( function(){



    var timelineEventNumber = $( '.timeline-box' ).length;
    var maxHeight = -1;
    $( '.timeline-box' ).each( function(){
        var $this = $( this );
        var idx = $this.index();

        var leftPct = idx / ( timelineEventNumber - 1 ) * 100;
        $this.css({
            'left'  : leftPct + '%'
        });

        $this.parent( '.timeline-bar' ).append( '<div class="timeline-event event-' + idx + '" style="left: ' + leftPct + '%;"></div>' );

        $this.addClass( 'event-' + idx );

        var topBoxWidth = ( 1 / ( Math.round( ( timelineEventNumber - 1) / 2 ) ) * 100 ) - 5 + '%';
        $this.css({
            'width' : topBoxWidth
        });

        $this.find( '.inner-timeline-box' ).width( $this.width() );

        if( ( idx + 1 ) === timelineEventNumber ){
            $this.addClass( 'last-event' ).css({
                'width' : parseFloat( topBoxWidth ) * 0.7 + '%'
            });
        }
        if( $this.is( ':nth-child(odd)' ) ){
            maxHeight = maxHeight > $this.outerHeight() ? maxHeight : $this.outerHeight();
        }
    });
    //$( '.timeline-box' ).css({ 'min-height' : maxHeight });
    $( '.timeline-bar' ).css({ 'margin' : ( maxHeight + 40 ) + 'px 0' });
    $( '.timeline-bar' ).prepend( '<div class="timeline-overlay-mobile" />' )

    var timelineAdvance = setInterval( timer, 600);
    var idx = 0;

    function timer(){
        $( '.event-' + idx ).addClass( 'show-box' );
        //$( '.desktop' ).find( '.event-' + idx ).addClass( 'show-box' );
        var topPct = ( idx / ( timelineEventNumber - 1 ) * 100 ) + '%';
        idx++;
        var leftPct = ( idx / ( timelineEventNumber - 1 ) * 100 ) + '%';
        $( '.timeline-overlay' ).css('width', leftPct );
        $( '.timeline-overlay-mobile' ).css('height', topPct );
        if( idx === timelineEventNumber ){
            clearInterval( timelineAdvance );
            $( '.inner-timeline-box' ).removeAttr( 'style' );
        }
    }

    var discoveryStylesStart = $( '.timeline-bar' ).children( '.discovery:first' ).attr( 'style' ).split( ':');
    var discoveryStylesEnd = $( '.timeline-bar' ).children( '.discovery:last' ).attr( 'style' ).split( ':');
    $( '.inner-discovery-container' ).css({
        'width' : parseFloat( discoveryStylesEnd[ 1 ] ) - parseFloat( discoveryStylesStart[ 1 ] ) + '%',
        'margin-left' : parseFloat( discoveryStylesStart[ 1 ] ) + '%'
    });

    majorBreakpoint();
    containerClass = $( '.main-container' ).attr( 'class' );
    mobileTimeline();

});


function majorBreakpoint() {
	if ( $( '#mobile' ).is( ':visible' ) ) {
		$( '.main-container' ).addClass( 'mobile' ).removeClass( 'desktop' );
	}
    if ( $( '#desktop' ).is( ':visible' ) ) {
		$( '.main-container' ).addClass( 'desktop' ).removeClass( 'mobile' );
	}
}




function mobileTimeline(){
    var firstMobileTimelineEvent = $( '.timeline-box:first' ).offset().top;
    var lastMobileTimelineEvent = $( '.timeline-box:last' ).offset().top;
    var timelineBarHeight =  $( '.timeline-bar' ).height();

    $( '.mobile' ).find( '.timeline-bar' ).css({
        'height' : lastMobileTimelineEvent - firstMobileTimelineEvent + 'px'
    });


}

$( window ).bind('resize orientationchange', function() {





    var maxHeight = -1;
    $( '.timeline-box' ).each( function(){
        var $this = $( this );
        if( $this.is( ':nth-child(odd)' ) ){
            maxHeight = maxHeight > $this.outerHeight() ? maxHeight : $this.outerHeight();
        }
    });
    $( '.timeline-bar' ).css({ 'margin' : ( maxHeight + 40 ) + 'px 0' });


    majorBreakpoint();
    mobileTimeline();

    var newContainerClass = $( '.main-container' ).attr( 'class' );
	if ( containerClass != newContainerClass ) {
        if( newContainerClass.indexOf( 'mobile' ) > -1 ){
            $( '.timeline-overlay' ).hide();
        }
        if( newContainerClass.indexOf( 'desktop' ) > -1 ){
            $( '.timeline-overlay' ).show();
            $( '.desktop' ).find( '.timeline-bar' ).css('height' , '4px');
        }
	}
	containerClass = newContainerClass;
});
