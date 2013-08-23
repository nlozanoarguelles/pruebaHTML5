
(function() {
  Dancer.addPlugin( 'waveform', function( canvasEl) {
    var
      ctx     = canvasEl.getContext( '2d' ),
      h       = canvasEl.height,
      w       = canvasEl.width,
      width   = 10,
      spacing = 0,
      count   = 1024;

    ctx.lineWidth   =  5;
    ctx.strokeStyle = "red";

    this.bind( 'update', function() {
      var waveform = this.getWaveform();
      ctx.clearRect( 0, 0, w, h );
      ctx.beginPath();
      ctx.moveTo( 0, h / 2 );
      for ( var i = 0, l = waveform.length; i < l && i < count; i++ ) {
        ctx.lineTo( i * ( spacing + width ), ( h / 2 ) + waveform[ i ] * ( h / 2 ));
      }
      ctx.stroke();
      ctx.closePath();
    });

    return this;
  });
})();
