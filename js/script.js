var timelineEventNumber = $( '.timeline-box' ).length;
$( function(){
    var timelineAdvance, idx = 0;
    $( '.timeline-box' ).each( function( idx ){
        var $this = $( this ), leftPct, topBoxWidth;
        idx = $this.index();

        // Give each event a numbered class to be used later
        $this.addClass( 'event-' + idx );

        // Math to equally distribute dynamic events along timeline
        leftPct = idx / ( timelineEventNumber - 1 ) * 100  + '%';
        $this.css( 'left', leftPct );

        // Dynamically add marker on timline for each event
        $( '.timeline-events' ).append( '<div class="timeline-event event-' + idx + '" /div>' );
        $( '.timeline-event.event-' + idx ).css( 'left', leftPct );

        // Math to dynamically set width of events
        topBoxWidth = ( 1 / ( Math.round( ( timelineEventNumber - 1) / 2 ) ) * 100 ) - 5 + '%';
        $this.css( 'width', topBoxWidth );

        // Find the last event and give it a special width so it will fit on the page
        if( ( idx + 1 ) === timelineEventNumber ){
            $this.css( 'width', parseFloat( topBoxWidth ) * 0.7 + '%' );
        }
    });

    runAll();

    // Run the animatons
    timelineAdvance = setInterval( timer, 600);
    //idx = 0;
    function timer( ){
        var leftPct;
        $( '.event-' + idx ).addClass( 'show-box' );
        if( $( '.event-' + idx ).hasClass( 'discovery' ) ){
            $( '.discovery-container' ).addClass( 'show-box' );
        }
        idx++;
        leftPct = ( idx / ( timelineEventNumber - 1 ) * 100 ) + '%';
        $( '.timeline-overlay' ).css({
            'width': leftPct,
            'height': getMobilePositions( idx )
        });

        // End the animation once the last one is run
        if( idx === timelineEventNumber ){

            clearInterval( timelineAdvance );
        }
    }
});

// Functions to run on resize
$( window ).bind('resize orientationchange', function() {
    // Remove transition when resizing to help with 'breakpoint flash'
    $( '.timeline-overlay' ).css( 'transition', 'none' );
    runAll();
});

function runAll(){
    majorBreakpoint();
    adjustHeight();
    discoveryStyles();
    mobileTimeline();
    makeRoom();
}

//  Dynamically adjust height of event marker
function adjustHeight(){
    $( '.timeline-box' ).each( function(){
        var $this = $( this ), idx = $this.index();
        $( '.timeline-event.event-' + idx ).css('top', getMobilePositions( idx ) );
    });
}

// Get the vertical offset for the mobile layout so events can be as large or small as necessary
function getMobilePositions( idx ){
    if( $( '.main-container' ).hasClass( 'mobile' ) ){
        var firstBox, lastBox, timelineBarHeight, nextBox;
        firstBox = $( '.timeline-box:first' ).offset().top;
        lastBox = $( '.timeline-box:last' ).offset().top;
        timelineBarHeight = lastBox - firstBox;
        if( ( idx + 1 ) <= timelineEventNumber ){
            nextBox = $( '.timeline-box.event-' + idx ).offset().top;
        } else {
            nextBox = timelineBarHeight + firstBox;
        }
        topPct = ( nextBox - firstBox ) / timelineBarHeight * 100 + '%';
    } else {
        topPct = '100%';
    }
    return topPct;
}

// Dynamically positioning the discovery container
function discoveryStyles(){
    var discStart = $( '.discovery:first' ).position();
    var discEnd = $( '.discovery:last' ).position();
    $( '.inner-discovery-container' ).css({
        'height' : discEnd.top - discStart.top,
        'top' : discStart.top,
        'width' : discEnd.left - discStart.left + 'px',
        'margin-left' : discStart.left
    });
}

// Function that adds/changes a class to main container based on the screensize
function majorBreakpoint() {
	if ( $( '#mobile' ).is( ':visible' ) ) {
		$( '.main-container' ).addClass( 'mobile' ).removeClass( 'desktop' );
	}
    if ( $( '#desktop' ).is( ':visible' ) ) {
		$( '.main-container' ).addClass( 'desktop' ).removeClass( 'mobile' );
	}
}



// Resizes the height of timeline and discovery containers
function mobileTimeline(){
    var firstMobileTimelineEvent = $( '.timeline-box:first' ).offset().top;
    var lastMobileTimelineEvent = $( '.timeline-box:last' ).offset().top;
    $( '.mobile' ).find( '.timeline-bar', '.discovery-container' ).css({
        'height' : lastMobileTimelineEvent - firstMobileTimelineEvent + 'px'
    });
}

// Find the vertical space necessary between heading and events
// Only looking at events that will be on top row
function makeRoom(){
    var maxHeight = -1;
    $( '.timeline-box' ).each( function(){
        var $this = $( this );
        if( $this.is( ':nth-child(odd)' ) ){
            maxHeight = maxHeight > $this.outerHeight() ? maxHeight : $this.outerHeight();
        }
    });
    $( '.timeline-bar' ).css({ 'margin' : ( maxHeight + 40 ) + 'px 0' });
}
