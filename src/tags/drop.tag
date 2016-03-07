<drop>
  <div draggable="true"
    ondragstart={dragStart}
    ondragenter={dragEnter}
    ondragleave={dragLeave}
    ondragover={dragOver}
    ondrop={drop}
  >
  <br/>
  <br/>
  Drop here to play
  <br/>
  <br/>
  <br/>
  </div>


  <style scoped>
    :scope div[draggable] { border: 1px black solid; }
  </style>

  <script>
    var tag = this;
    var normalizer = require('../utils/drop-normalizer.js');
    //-
    dragStart(e) {
      console.log('drag start')
    }
    //-
    dragEnter(e) {
      e.target.style.opacity = '0.4';
      console.log('drag enter')
    }
    dragLeave(e) {
      e.target.style.opacity = '1';
      console.log('drag leave')
    }
    dragOver(e) {
      e.target.style.opacity = '.4';
      console.log('drag over')
    }
    drop(e) {
      console.log('drop drop')
      e.target.style.opacity = '1';
      e.preventDefault();
      e.stopPropagation();
      normalizer.normalize(dataTransfer).forEach(function (f) {
        if (f.type==='file') {
          tag.trigger('file-dropped', f)
        } else if (f.type.match(/uri-list/)) {
          tag.trigger('url-dropped', f)
        }
      })
    }
  </script>

</drop>
