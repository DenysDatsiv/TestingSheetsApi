import { Component, OnInit } from '@angular/core';
import { GoogleService } from './google.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  data: any[] = [];

  constructor(private sheetService: GoogleService) { }

  ngOnInit() {
    this.sheetService.getData().subscribe(
      (data) => {
        this.data = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }
}