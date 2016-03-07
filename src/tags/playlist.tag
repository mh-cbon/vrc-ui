<playlist>

  <table>
    <tr each={items} class={ current: current==='current' } ondblclick={play}>
      <td class="id"># {id}</td>
      <td class="name">{name}</td>
      <td class="duration">{hDuration}</td>
    </tr>
  </table>

  <style scoped>
    :scope table tr > td {
      cursor: pointer;
    }
    :scope .current {
      font-weight: bold;
      text-decoration: underline;
    }
    :scope .duration{
      text-decoration: underline;
    }
  </style>

  <script>
    var tag = this;

    tag.on('mount', function(){

      opts.vlc && opts.vlc.on('playlist', function (items) {
        try{
          tag.items = items;
          tag.update()
        }catch(ex){
          console.log(ex)
        }
      })
    })

    play(e) {
      opts.vlc && opts.vlc.play(e.item.id, function () {
        console.log(arguments)
      })
    }

  </script>

</playlist>
