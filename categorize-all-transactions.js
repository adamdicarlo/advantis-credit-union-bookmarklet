var tree = getCategoryTree()
var a = treeToOptions(tree)
var options = a[0]
var ids = a[1]
var $dialog = $(
  '<div style="background-color:rgba(0,0,0,0.7);position:fixed;left:0;top:0;right:0;bottom:0;z-index:9999;display:flex;align-items:center;justify-content:center">' +
    '<div style="max-width:50%;max-height:90%;overflow:scroll;padding:20px;background-color:white;font-size:11px">' +
      options.map(function (o, i) {
        return '<a href="#" id="' + i + '">' + o + '</a>'
      }).join('<br/>') +
    '</div>' +
  '</div>'
)

$(document.body).append($dialog)

$dialog.on('click', 'a', function () {
  if (!this.id || !ids[this.id]) {
    return
  }
  categorizeEverything(ids[this.id])
  $dialog.remove()
})
$dialog.on('click', $dialog.remove)

function getCategoryTree () {
  var $dropdown = $('.category-dropdown:nth(0)')
  var tree = {}
  $dropdown.find('>li.master-category').each(function (_, li) {
    var cat = {}
    var name = li.childNodes[0].textContent
    tree[name] = {}
    $(li).find('li[id]').each(function (_, leaf) {
      tree[name][leaf.id] = leaf.childNodes[0].textContent
    })
  })
  return tree
}

function treeToOptions (tree) {
  var options = []
  var ids = []
  Object.keys(tree).forEach(function (key) {
    Object.keys(tree[key]).forEach(function (id) {
      options.push('' + options.length + ': ' + key + ' - ' + tree[key][id])
      ids.push(id)
    })
  })
  return [options, ids]
}

function categorizeEverything (id) {
  var clickers = []
  $('a.uncategorized + ul').each(function (_, el) {
    clickers.push($(el).find('[id=' + id + ']'))
  })
  clickOne(0)
  
  function clickOne(index) {
    if (index < clickers.length) {
      // Simulate a click to make the page's JS send the POST request to categorize.
      $(clickers[index++]).click()
      
      // Wait a bit between clicks in order not to hammer their server.
      // Also, it's more fun to watch the dropdowns trigger rapid-fire rather than all at once.
      setTimeout(clickOne.bind(null, index), 300)
    } else {
      alert('all categorized!')
    }
  }
}
