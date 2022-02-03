var cur_page = 1;
var old_id = "btn_start";

function start() {
  setTimeout(function(){
    switch_page('headpage');
  }, 2000);
}

function switch_page(id) {
  document.getElementById(old_id).style.opacity = 0;
  document.getElementById(old_id).style.animation = "fadeOut 0.5s";
  
  setTimeout(function(){
    if (old_id == "btn_start") 
      document.getElementById("start").style.display = "none";

    document.getElementById(old_id).style.display = "none";
    document.getElementById(old_id).style.visibility = "hidden";
    document.getElementById(id).style.display = "flex";
    document.getElementById(id).style.visibility = "visible";
    document.getElementById(id).style.opacity = 1;
    document.getElementById(id).style.animation = "fadeIn 0.5s";

    old_id = id;
  }, 500);

}
