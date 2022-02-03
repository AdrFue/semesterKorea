document.addEventListener('keydown', logKey);

function logKey(e) {
  switch(e.key) {
    case "1":
      switch_page("headpage");
      break;
    case "2":
      switch_page("about");
      break;
    case "3":
      switch_page("projects");
      break;
    case "4":
      switch_page("false_memories");
      break;
    case "5":
      switch_page("self_portrait");
      break;     
    case "6":
      switch_page("hosted");
      break;
    case "7":
      switch_page("fragile_gif");
      break;
    case "8":
      switch_page("agatha_appears");
      break;
    case "9":
      switch_page("conclusion");
      break;    
    case "0":
      switch_page("sources");
      break;

    case "Enter":
    case "ArrowRight":
      if (cur_page == 9) {
        cur_page = 0;
      } else {
        cur_page++;
      }
      document.dispatchEvent(new KeyboardEvent('keydown', {'key': String(cur_page) }));
      break;
      
    case "Backspace":
    case "ArrowLeft":
      if (cur_page == 0) {
        cur_page = 9;
      } else {
        cur_page--;
      }
      document.dispatchEvent(new KeyboardEvent('keydown', {'key': String(cur_page) }));
  }
}