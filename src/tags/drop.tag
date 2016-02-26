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


  <style>
    div[draggable] { border: 1px black solid; }
  </style>

  <script>
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
      opts.dropper && opts.dropper.trigger('dropped', e.dataTransfer)
    }
  </script>

</drop>
