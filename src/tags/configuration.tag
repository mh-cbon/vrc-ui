<configuration>
  <span>{state==='lookup' ? 'Looking up ....' : ''}</span>

  <div class="{hidden: state!=='ready'}">
    Found {Object.keys(hosts).length} host(s)
    <div each={ host, services in hosts }>
      { host } provides services :
      <ul>
        <li each={ services }>
          { name } - { type }@{ port }
        </li>
      </ul>
      <button onclick={hostSelected}  class="{hidden: selectedHost && host!==selectedHost}">Choose</button>
      <button onclick={hostUnselected}  class="{hidden: !selectedHost || host===selectedHost}">Unchoose</button>
    </div>
    <div class="refresh">
      <button onclick={refreshServices}>Refresh</button>
    </div>
  </div>


  <style scoped>
    :scope .hidden{ display: none }
    :scope .refresh{ text-align: right; }
  </style>

  <script>
    var tag = this;

    tag.state = "lookup";
    tag.selectedHost = '';

    tag.on('mount', function(){
      var providers = this.root.querySelectorAll('[name="providers"]')[0];
    });

    tag.on('hosts-found', function (hosts) {
      tag.hosts = hosts;
      tag.state = "ready";
      tag.update();
    })

    //-
    hostSelected(e) {
      tag.selectedHost = e.item.host;
      tag.trigger('remote-selected', e.item);
      tag.update()
    }
    hostUnselected(e) {
      tag.trigger('remote-unselected');
      tag.selectedHost = '';
      tag.update()
    }
    refreshServices(e) {
      tag.state = "lookup";
      tag.hosts = [];
      tag.trigger('refresh');
    }
  </script>

</configuration>
