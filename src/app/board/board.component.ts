import { Component, OnInit } from '@angular/core';
import * as uuid from 'uuid';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  items = []
  current = {}

  constructor() { }

  ngOnInit() {
  }

  newItem() {
    console.log('new')
    this.items.push({
      id: uuid.v4(),
      position: {x: 0, y: 0},
      maxHeight: 100,
      maxWidth: 100
    })
  }

  onMoveEnd($event, item) {
    console.log('move end', $event)
    let wow = this.items[this.items.findIndex(pred => pred.id == item.id)]

    console.log(wow, item)
    wow.position = {x: $event.x, y: $event.y}
  }

  printJson() {
    console.log(this.items);

    const c = JSON.stringify(this.items);
    const file = new Blob([c], {type: 'text/json'});
    this.download(file,"fileName.json");
  }

  onFileChanged(event) {
    let selectedFile = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsText(selectedFile, "UTF-8");
    fileReader.onload = () => {
      this.items = JSON.parse(fileReader.result.toString());
    }
    fileReader.onerror = (error) => {
      console.log(error);
    }
  }

  download(blob, filename) {
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(blob, filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(blob);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
}

  setCurrent(item) {
    console.log('setCurrent')

    this.current = item
  }

  onResizeStop($event, item) {
    console.log('resize stop')

    console.log($event)
    let wow = this.items[this.items.findIndex(pred => pred.id == item.id)]
    wow.maxWidth = $event.size.width
    wow.maxHeight = $event.size.height
  }

  openLink(item) {
    window.open(item.url, '_blank')
  }

}
