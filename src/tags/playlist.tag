<playlist>

  <table>
    <tr each={items} class={ current: current==='current' } ondblclick={play}>
      <td class="id"># {id}</td>
      <td class="name">{name}</td>
      <td class="duration">{hDuration}</td>
    </tr>
  </table>

  <style>
    table tr > td {
      cursor: pointer;
    }
    .current {
      font-weight: bold;
      text-decoration: underline;
    }
    .duration{
      text-decoration: underline;
    }
  </style>

  <script>
    var tag = this;

    tag.on('mount', function(){

      var timeHandle = this.root.querySelectorAll('input[name="time"]')[0];

      opts.vlc && opts.vlc.on('playlist', function (items) {
        try{
          tag.items = items;
          tag.update()
          // console.log(s)
        }catch(ex){
          console.log(ex)
        }
      })
    })

    play(e) {
      opts.vlc && opts.vlc.trigger('ctrl-play', e.item.id);
    }

  </script>

</playlist>
