$( function(){
    var timelineEventNumber = $( '.timeline-box' ).length;

    var timelineEvents = [];

    for ( var i = 1; i <= timelineEventNumber; i++ ) {

        var leftPct = ( i - 1) / ( timelineEventNumber - 1 ) * 100;

        style = ' style="left: ' + leftPct + '%;"';


        timelineEvents.push( '<div class="timeline-event event-' + i  +  '"' + style + ' />' );
    }

    $( '.timeline-bar' ).append( timelineEvents.join( '\n' ) );


});
