import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  verse: string;
  imgUrl: string;
  passage: string;
  todayNumber: number;

  constructor() { }

  ngOnInit() {

    this.todayNumber = this.daysIntoYear(new Date());
    fetch('https://developers.youversionapi.com/1.0/verse_of_the_day/' + this.todayNumber + '?version_id=206', {
      headers: {
        'X-YouVersion-Developer-Token': 'lhGSP91Ig3J_1kLTC6FEm5I6HtE',
        'Accept-Language': 'en',
        Accept: 'application/json',
      }
    })
      .then((result) => result.json())
      .then((json) => {
        var verseObject = json['verse'];
        console.log(json);
        this.verse = json.verse.text;
        this.imgUrl = json.image.url;
        this.passage = json.verse.human_reference;
      });


    fetch('https://developers.youversionapi.com/1.0/versions', {
      headers: {
        'X-YouVersion-Developer-Token': 'lhGSP91Ig3J_1kLTC6FEm5I6HtE',
        'Accept-Language': 'en',
        Accept: 'application/json',
      }
    })
      .then((result) => result.json())
      .then((json) => console.log(json))


  }

  fetchVerseForDay(day: number) {

  }

  clicked() {
    console.log("CLICKED!");
  }

  daysIntoYear(date) {
    return (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - Date.UTC(date.getFullYear(), 0, 0)) / 24 / 60 / 60 / 1000;
  }


}
