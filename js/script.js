

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

        var topBoxWidth = ( 1 / ( Math.round( timelineEventNumber / 2 ) ) * 100 ) + '%';
        $this.css({
            'width' : topBoxWidth
        });

        $this.find( '.inner-timeline-box' ).width( $this.width() );

        if( ( idx + 1 ) === timelineEventNumber ){
            $this.addClass( 'last-event' ).css({
                'width' : parseFloat( topBoxWidth ) * 0.75 + '%'
            });
        }

        maxHeight = maxHeight > $this.outerHeight() ? maxHeight : $this.outerHeight();
    });
    //$( '.timeline-box' ).css({ 'min-height' : maxHeight });
    $( '.timeline-bar' ).css({ 'margin' : ( maxHeight + 80) + 'px 0' });

    var timelineAdvance = setInterval( timer, 400);
    var idx = 0;

    function timer(){
        $( '.event-' + idx ).addClass( 'show-box' );
        idx++;
        var leftPct = ( idx / ( timelineEventNumber - 1 ) * 100 ) + '%';
        $( '.timeline-overlay' ).css('width', leftPct );
        if( idx > timelineEventNumber ){
            clearInterval( timelineAdvance );
            $( '.inner-timeline-box' ).removeAttr( 'style' );
        }
    }


});

$( window ).bind('resize orientationchange', function() {
    var maxHeight = -1;
    $( '.timeline-box' ).each( function(){
        var $this = $( this );
        maxHeight = maxHeight > $this.outerHeight() ? maxHeight : $this.outerHeight();
    });
    $( '.timeline-bar' ).css({ 'margin' : ( maxHeight + 80) + 'px 0' });
});
