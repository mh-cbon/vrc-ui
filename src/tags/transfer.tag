<transfer>

  <table>
    <tr each={items}>
      <td class="name">{name}</td>
      <td class="progress">{hDuration}</td>
    </tr>
  </table>

  <style scoped>
    :scope table tr > td {
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

  </script>

</transfer>
