<remote-control>

  <div>
    <span class={ shown: opts.loadingVideo, loading: true }>Loading the video...</span>
    <span class='title'>{opts.meta.title}</span>
    <br>
    <input type="range" value="{parseInt(opts.status.position*1000)}"
      max="1000" min="0" step="1"
      onwheel={seek}
      onchange={seekSet}
      name="time">
    <br>
    <button title="play" onclick={play}>&#9654;</button>
    <button title="pause" onclick={pause}>&#9646;&#9646;</button>
    <button title="stop" onclick={stop}>&#9726;</button>
    <span class="elapsed">{opts.status.hTime}</span>
    <span class="duration">{opts.status.hLength}</span>
    <input type="range" value="{opts.status.volume}"
      max="{opts.maxVolume}" min="0" step="1"
      name="volume" onwheel={volumeUpdate} onchange={volumeSet}>
  </div>

  <style type='text/css'>
    :scope div {
      border: black 1px solid;
    }
    .loading {
      display: none;
    }
    .shown {
      display: inline;
    }
    .title{
      margin: 0px;
      width: 100%;
    }
    input[name="time"] {
      margin: 0px;
      width: 100%;
    }
    input[name="volume"] {
      margin: 0px;
      width: 4em;
      vertical-align: bottom;
    }
  </style>

  <script>

    var tag = this;

    opts.loadingVideo = false;

    tag.on('mount', function(){

      var timeHandle = this.root.querySelectorAll('input[name="time"]')[0];

      opts.vlc && opts.vlc.on('status', function (s) {
        try{

          opts.status = s;

          if (s.information && s.information.category)
            opts.meta = s.information.category.meta;
          else
            opts.meta = {title: 'no media playing'}

          if (opts.status.state==='stopped') {
            timeHandle.disabled = 'disabled'

          } else if (opts.status.state==='playing') {
            timeHandle.disabled = null;

          } else if (opts.status.state==='paused') {
            timeHandle.disabled = null;

          } else {
            console.log(status)
          }

          if (opts.loadingVideo) {
            if (s.currentplid>-1 && s.position>0) {
              opts.loadingVideo = false;
            }
          }

          tag.update()
        }catch(ex){
          console.log(ex)
        }
      })
    })

    opts.vlc && opts.vlc.on('ctrl-play', function () {
      opts.loadingVideo = true
      tag.update()
    })

    play(e) {
      opts.vlc && opts.vlc.trigger('ctrl-play')
    }
    volumeUpdate(e) {
      var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail))) * 10;
      var el = e.target;
      e.target.value = parseInt(e.target.value) + delta;
      opts.vlc && opts.vlc.trigger('ctrl-volume-rel', delta)
    }
    volumeSet(e) {
      opts.vlc && opts.vlc.trigger('ctrl-volume-abs', e.target.value)
    }
    pause(e) {
      (opts.status.state!=='paused') && opts.vlc && opts.vlc.trigger('ctrl-pause')
    }
    stop(e) {
      opts.vlc && opts.vlc.trigger('ctrl-stop')
    }


  </script>

</remote-control>
